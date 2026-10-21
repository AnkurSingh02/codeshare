import { useState, useEffect } from 'react'
import { Download, X, Smartphone, Monitor } from 'lucide-react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if user previously dismissed
    if (localStorage.getItem('codeshare-install-dismissed')) {
      return
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Show after 10 seconds (don't annoy immediately)
      setTimeout(() => setShowPrompt(true), 10000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('codeshare-install-dismissed', 'true')
  }

  if (isInstalled || !showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 bg-[#1e293b] border border-[#334155] rounded-2xl shadow-2xl p-4 animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 rounded-lg hover:bg-[#334155] text-slate-400 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-indigo-500/10 shrink-0 mt-0.5">
          <Download className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">
            Install CodeShare
          </h3>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            Install for quick access, offline support, and a native app experience.
          </p>
          <div className="flex items-center gap-2 mb-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Smartphone className="w-3 h-3" /> Mobile
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Monitor className="w-3 h-3" /> Desktop
            </span>
          </div>
          <button
            onClick={handleInstall}
            className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold transition-colors"
          >
            Install App
          </button>
        </div>
      </div>
    </div>
  )
}