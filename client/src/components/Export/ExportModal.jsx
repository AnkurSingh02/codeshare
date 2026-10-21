import { useState, useRef, useCallback } from 'react'
import { toPng, toSvg } from 'html-to-image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Download,
  Image,
  Check,
  Loader2,
  Grid3X3,
  Frame,
  Type,
  CircleDot,
  Hash,
} from 'lucide-react'
import ExportPreview from './ExportPreview'
import {
  BACKGROUNDS,
  PADDING_OPTIONS,
  EXPORT_DEFAULTS,
} from '../../lib/exportConfig'

export default function ExportModal({
  isOpen,
  onClose,
  code,
  language,
  theme,
}) {
  const [settings, setSettings] = useState(EXPORT_DEFAULTS)
  const [exporting, setExporting] = useState(false)
  const [exported, setExported] = useState(false)
  const [format, setFormat] = useState('png')
  const previewRef = useRef(null)

  const update = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleExport = useCallback(async () => {
    if (!previewRef.current) return
    setExporting(true)
    try {
      await new Promise((r) => setTimeout(r, 300))
      const options = {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: settings.background === 'transparent' ? undefined : null,
      }
      const dataUrl = format === 'svg'
        ? await toSvg(previewRef.current, options)
        : await toPng(previewRef.current, options)

      const link = document.createElement('a')
      link.download = `codeshare-${language}-${Date.now()}.${format}`
      link.href = dataUrl
      link.click()

      setExported(true)
      setTimeout(() => setExported(false), 2000)
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }, [format, language, settings.background])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative z-10 w-[95vw] max-w-5xl max-h-[90vh] bg-[#1e293b] rounded-2xl border border-[#334155] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]">
              <div className="flex items-center gap-3">
                <Image className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Export as Image</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#334155] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Settings */}
              <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-[#334155] p-5 space-y-6 overflow-y-auto shrink-0">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    <Grid3X3 className="w-3.5 h-3.5" /> Background
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {BACKGROUNDS.map((bg) => (
                      <motion.button
                        key={bg.id}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => update('background', bg.id)}
                        className={`w-full aspect-square rounded-lg border-2 transition-all ${
                          settings.background === bg.id
                            ? 'border-indigo-400'
                            : 'border-transparent hover:border-slate-500'
                        }`}
                        style={parseBgStyle(bg.style)}
                        title={bg.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    <Frame className="w-3.5 h-3.5" /> Padding
                  </label>
                  <div className="flex gap-2">
                    {PADDING_OPTIONS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => update('padding', p.id)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          settings.padding === p.id
                            ? 'bg-indigo-500 text-white'
                            : 'bg-[#334155] text-slate-300 hover:bg-[#475569]'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    <Type className="w-3.5 h-3.5" /> Options
                  </label>
                  <div className="space-y-2">
                    <Toggle icon={<CircleDot className="w-3.5 h-3.5" />} label="Window Controls" checked={settings.showWindowControls} onChange={(v) => update('showWindowControls', v)} />
                    <Toggle icon={<Hash className="w-3.5 h-3.5" />} label="Line Numbers" checked={settings.showLineNumbers} onChange={(v) => update('showLineNumbers', v)} />
                    <Toggle icon={<Type className="w-3.5 h-3.5" />} label="Language Label" checked={settings.showLanguage} onChange={(v) => update('showLanguage', v)} />
                    <Toggle icon={<Type className="w-3.5 h-3.5" />} label="Watermark" checked={settings.showWatermark} onChange={(v) => update('showWatermark', v)} />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    <Download className="w-3.5 h-3.5" /> Format
                  </label>
                  <div className="flex gap-2">
                    {['png', 'svg'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium uppercase transition-colors ${
                          format === f ? 'bg-indigo-500 text-white' : 'bg-[#334155] text-slate-300 hover:bg-[#475569]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="flex-1 flex items-center justify-center p-6 overflow-auto bg-[#0f172a] min-h-75">
                <div className="transform scale-[0.65] lg:scale-75 origin-center">
                  <ExportPreview
                    code={code}
                    language={language}
                    theme={theme}
                    settings={settings}
                    previewRef={previewRef}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#334155]">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#334155] transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExport}
                disabled={exporting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
              >
                {exporting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Exporting...</>
                ) : exported ? (
                  <><Check className="w-4 h-4" /> Downloaded!</>
                ) : (
                  <><Download className="w-4 h-4" /> Download {format.toUpperCase()}</>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function Toggle({ icon, label, checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-[#334155] hover:border-[#475569] transition-colors"
    >
      <div className="flex items-center gap-2 text-xs text-slate-300">{icon}{label}</div>
      <div className={`w-8 rounded-full transition-colors relative ${checked ? 'bg-indigo-500' : 'bg-[#334155]'}`} style={{ height: '18px' }}>
        <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </div>
    </button>
  )
}

function parseBgStyle(styleStr) {
  if (styleStr.includes('linear-gradient')) return { background: styleStr.replace('background: ', '') }
  if (styleStr.includes('transparent')) return { background: 'repeating-conic-gradient(#334155 0% 25%, #1e293b 0% 50%) 50% / 12px 12px' }
  return { backgroundColor: styleStr.replace('background: ', '') }
}