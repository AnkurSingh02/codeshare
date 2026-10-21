import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import EditorHeader from '../components/Editor/EditorHeader'
import CollabEditor from '../components/Editor/CollabEditor'
import StatusBar from '../components/Editor/StatusBar'
import ExportModal from '../components/Export/ExportModal'
import { useYjs } from '../hooks/useYjs'
import { Loader2, Wifi, WifiOff, Zap } from 'lucide-react'
import { toast } from '../components/UI/Toast'

export default function RoomPage() {
  const { roomId } = useParams()
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('codeshare-theme') || 'one-dark'
  })
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('codeshare-fontsize')) || 14
  })
  const { doc, awareness, peers, isSynced, status } = useYjs(roomId)

  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 })
  const [stats, setStats] = useState({ lines: 0, chars: 0, selected: 0 })
  const [showExport, setShowExport] = useState(false)
  const [codeText, setCodeText] = useState('')
  const [showLoading, setShowLoading] = useState(true)
  const [prevPeers, setPrevPeers] = useState(1)

  const handleEditorUpdate = useCallback((view) => {
    if (!view) return
    const state = view.state
    const pos = state.selection.main.head
    const line = state.doc.lineAt(pos)
    const selection = state.selection.main

    setCursorPos({ line: line.number, col: pos - line.from + 1 })
    setStats({
      lines: state.doc.lines,
      chars: state.doc.length,
      selected: Math.abs(selection.to - selection.from),
    })
    setCodeText(state.doc.toString())
  }, [])

  // Notify when peers join/leave
  useEffect(() => {
    if (peers > prevPeers && prevPeers >= 1) {
      toast('A collaborator joined the room!', 'info')
    } else if (peers < prevPeers && peers >= 1) {
      toast('A collaborator left the room.', 'info')
    }
    setPrevPeers(peers)
  }, [peers, prevPeers])

  useEffect(() => { localStorage.setItem('codeshare-theme', theme) }, [theme])
  useEffect(() => { localStorage.setItem('codeshare-fontsize', fontSize.toString()) }, [fontSize])

  useEffect(() => {
    if (isSynced) {
      const timer = setTimeout(() => setShowLoading(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isSynced])

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[#0f172a]">
      <AnimatePresence mode="wait">
        {showLoading || !doc ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="h-screen flex flex-col items-center justify-center bg-[#0f172a] gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="w-10 h-10 text-indigo-400" />
            </motion.div>
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white font-medium mb-1"
              >
                Connecting to room
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-400 text-sm font-mono"
              >
                {roomId}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-[#1e293b] border border-[#334155]"
            >
              <Wifi className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-xs text-slate-400">Establishing connection...</span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col h-screen"
          >
            <EditorHeader
              language={language}
              onLanguageChange={setLanguage}
              roomId={roomId}
              peerCount={peers}
              connectionStatus={status}
              theme={theme}
              onThemeChange={setTheme}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              onExport={() => setShowExport(true)}
            />

            <AnimatePresence>
              {status === 'fallback' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 px-4 py-1 bg-amber-500/10 border-b border-amber-500/20 text-[11px] text-amber-300 overflow-hidden"
                >
                  <WifiOff className="w-3 h-3 shrink-0" />
                  Single-user mode — sync activates when peers connect
                </motion.div>
              )}
              {status === 'synced' && peers > 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 px-4 py-1 bg-emerald-500/10 border-b border-emerald-500/20 text-[11px] text-emerald-300 overflow-hidden"
                >
                  <Zap className="w-3 h-3 shrink-0" />
                  Real-time sync active — {peers} users connected
                </motion.div>
              )}
            </AnimatePresence>

            <CollabEditor
              language={language}
              ydoc={doc}
              awareness={awareness}
              theme={theme}
              fontSize={fontSize}
              onUpdate={handleEditorUpdate}
            />

            <StatusBar
              cursorPos={cursorPos}
              stats={stats}
              language={language}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        code={codeText}
        language={language}
        theme={theme}
      />
    </div>
  )
}