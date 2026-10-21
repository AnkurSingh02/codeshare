import { useEffect, useState, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

// Server URL — uses env variable in production, localhost in dev
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:1234'

export function useYjs(roomId) {
  const [state, setState] = useState({
    doc: null,
    awareness: null,
    peers: 1,
    isSynced: false,
    status: 'connecting',
  })

  const cleanupRef = useRef(null)

  useEffect(() => {
    if (!roomId) return
    let destroyed = false

    // 1. Create Yjs document
    const ydoc = new Y.Doc()

    setState({
      doc: ydoc,
      awareness: null,
      peers: 1,
      isSynced: false,
      status: 'connecting',
    })

    // 2. Connect to OUR WebSocket server
    let provider
    try {
      provider = new WebsocketProvider(
        WS_URL,
        `codeshare-${roomId}`,
        ydoc
      )
    } catch (err) {
      console.warn('WebSocket provider failed:', err)
      if (!destroyed) {
        setState((prev) => ({
          ...prev,
          isSynced: true,
          status: 'fallback',
        }))
      }
      return
    }

    const awareness = provider.awareness

    if (!destroyed) {
      setState((prev) => ({ ...prev, awareness }))
    }

    // 3. Track connected peers
    const updatePeers = () => {
      if (destroyed) return
      const count = awareness.getStates().size
      setState((prev) => ({ ...prev, peers: count }))
    }
    awareness.on('change', updatePeers)

    // 4. Track sync state
    provider.on('sync', (isSynced) => {
      if (destroyed) return
      if (isSynced) {
        setState((prev) => ({
          ...prev,
          isSynced: true,
          status: 'synced',
        }))
      }
    })

    // 5. Track connection status
    provider.on('status', ({ status }) => {
      if (destroyed) return
      if (status === 'connected') {
        setState((prev) => ({ ...prev, status: 'synced' }))
      } else if (status === 'disconnected') {
        setState((prev) => ({ ...prev, status: 'fallback' }))
      }
    })

    // 6. Timeout fallback (safety net)
    const timeout = setTimeout(() => {
      if (destroyed) return
      setState((prev) => {
        if (!prev.isSynced) {
          console.warn('WebSocket sync timeout — single-user mode')
          return { ...prev, isSynced: true, status: 'fallback' }
        }
        return prev
      })
    }, 5000)

    // 7. Cleanup
    cleanupRef.current = () => {
      destroyed = true
      clearTimeout(timeout)
      awareness.off('change', updatePeers)
      provider.destroy()
      ydoc.destroy()
    }

    return () => {
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [roomId])

  return state
}