import { useState, useEffect } from 'react'
import { WifiOff, Wifi } from 'lucide-react'

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false)
      setShowBanner(true)
    }

    const handleOnline = () => {
      setIsOnline(true)
      setShowBanner(true)
      // Auto-hide after 3 seconds when back online
      setTimeout(() => setShowBanner(false), 3000)
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  if (!showBanner) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-200 flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium transition-all ${
        isOnline
          ? 'bg-emerald-500/90 text-white'
          : 'bg-red-500/90 text-white'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="w-3.5 h-3.5" />
          Back online — changes will sync
        </>
      ) : (
        <>
          <WifiOff className="w-3.5 h-3.5" />
          You're offline — edits are saved locally
        </>
      )}
      <button
        onClick={() => setShowBanner(false)}
        className="ml-2 text-white/60 hover:text-white"
      >
        ✕
      </button>
    </div>
  )
}