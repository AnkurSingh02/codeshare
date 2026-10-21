import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Code2,
  ChevronDown,
  Copy,
  Check,
  Home,
  Link2,
  Palette,
  Minus,
  Plus,
  Keyboard,
  Image,
} from 'lucide-react'
import { LANGUAGES } from '../../lib/languages'
import { ALL_THEMES } from '../../lib/themes'

export default function EditorHeader({
  language,
  onLanguageChange,
  roomId,
  peerCount = 1,
  connectionStatus = 'connecting',
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  onExport,
}) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  const currentLang = LANGUAGES.find((l) => l.id === language)
  const currentTheme = ALL_THEMES.find((t) => t.id === theme)

  const handleCopyLink = async () => {
    const url = roomId
      ? `${window.location.origin}/room/${roomId}`
      : window.location.href
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statusDot = {
    synced: 'bg-emerald-400',
    fallback: 'bg-amber-400',
    connecting: 'bg-slate-500 animate-pulse',
  }[connectionStatus] || 'bg-slate-500'

  const SHORTCUTS = [
    { keys: 'Ctrl + Z', action: 'Undo' },
    { keys: 'Ctrl + Shift + Z', action: 'Redo' },
    { keys: 'Ctrl + D', action: 'Select next occurrence' },
    { keys: 'Alt + ↑/↓', action: 'Move line up/down' },
    { keys: 'Ctrl + /', action: 'Toggle comment' },
    { keys: 'Ctrl + F', action: 'Find' },
    { keys: 'Ctrl + H', action: 'Find & Replace' },
    { keys: 'Tab', action: 'Indent' },
  ]

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-[#334155] shrink-0">
      {/* Left */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Code2 className="w-5 h-5 text-indigo-400" />
          <span className="text-base font-bold text-white tracking-tight hidden sm:inline">
            Code<span className="text-indigo-400">Share</span>
          </span>
        </button>

        {roomId && (
          <>
            <div className="h-4 w-px bg-[#334155]" />
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0f172a] border border-[#334155]">
              <Link2 className="w-2.5 h-2.5 text-slate-500" />
              <span className="text-[11px] font-mono text-slate-400">{roomId}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
              <span className="text-[11px] text-slate-400">{peerCount} online</span>
            </div>
          </>
        )}
      </div>

      {/* Center Controls */}
      <div className="flex items-center gap-2">
        {/* Language */}
        <div className="relative">
          <button
            onClick={() => { setShowLangMenu(!showLangMenu); setShowThemeMenu(false) }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#334155] hover:bg-[#475569] text-xs text-slate-200 transition-colors"
          >
            {currentLang?.name || 'JavaScript'}
            <ChevronDown className="w-3 h-3" />
          </button>
          {showLangMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50 w-44 bg-[#1e293b] border border-[#334155] rounded-lg shadow-2xl py-1 max-h-56 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => { onLanguageChange(lang.id); setShowLangMenu(false) }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      lang.id === language
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'text-slate-300 hover:bg-[#334155]'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Theme */}
        <div className="relative">
          <button
            onClick={() => { setShowThemeMenu(!showThemeMenu); setShowLangMenu(false) }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#334155] hover:bg-[#475569] text-xs text-slate-200 transition-colors"
          >
            <Palette className="w-3 h-3" />
            <span className="hidden md:inline">{currentTheme?.name || 'Theme'}</span>
          </button>
          {showThemeMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowThemeMenu(false)} />
              <div className="absolute top-full right-0 mt-1.5 z-50 w-40 bg-[#1e293b] border border-[#334155] rounded-lg shadow-2xl py-1">
                {ALL_THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { onThemeChange(t.id); setShowThemeMenu(false) }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      t.id === theme
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'text-slate-300 hover:bg-[#334155]'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Font Size */}
        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#334155]">
          <button
            onClick={() => onFontSizeChange(Math.max(10, fontSize - 2))}
            className="p-0.5 rounded hover:bg-[#475569] text-slate-300 transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-[11px] text-slate-300 w-6 text-center">{fontSize}</span>
          <button
            onClick={() => onFontSizeChange(Math.min(24, fontSize + 2))}
            className="p-0.5 rounded hover:bg-[#475569] text-slate-300 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Shortcuts */}
        <div className="relative">
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="p-1.5 rounded-md hover:bg-[#334155] text-slate-400 hover:text-white transition-colors"
            title="Keyboard shortcuts"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>
          {showShortcuts && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowShortcuts(false)} />
              <div className="absolute top-full right-0 mt-1.5 z-50 w-56 bg-[#1e293b] border border-[#334155] rounded-lg shadow-2xl p-3">
                <h4 className="text-xs font-semibold text-white mb-2">Keyboard Shortcuts</h4>
                <div className="space-y-1.5">
                  {SHORTCUTS.map((s) => (
                    <div key={s.keys} className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{s.action}</span>
                      <kbd className="text-[10px] text-slate-300 bg-[#334155] px-1.5 py-0.5 rounded font-mono">
                        {s.keys}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {roomId && (
          <>
            <button
              onClick={onExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-xs font-medium transition-colors"
              title="Export as image"
            >
              <Image className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="p-1.5 rounded-md hover:bg-[#334155] text-slate-400 hover:text-white transition-colors"
              title="Leave room"
            >
              <Home className="w-3.5 h-3.5" />
            </button>
          </>
        )}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-medium transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}