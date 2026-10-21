import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import InstallPrompt from './components/UI/InstallPrompt'
import OfflineBanner from './components/UI/OfflineBanner'
import ToastContainer from './components/UI/Toast'

export default function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      import('virtual:pwa-register').then(({ registerSW }) => {
        registerSW({
          onNeedRefresh() {
            console.log('New version available')
          },
          onOfflineReady() {
            console.log('CodeShare ready for offline use!')
          },
        })
      }).catch(() => {})
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
      <InstallPrompt />
      <OfflineBanner />
      <ToastContainer />
    </BrowserRouter>
  )
}