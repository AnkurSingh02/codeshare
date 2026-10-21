import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

export function useRoom() {
  const navigate = useNavigate()

  const createRoom = useCallback(() => {
    const roomId = nanoid(8)
    navigate(`/room/${roomId}`)
  }, [navigate])

  const joinRoom = useCallback((roomId) => {
    const cleanId = roomId
      .trim()
      .replace(/^.*\/room\//, '')   // strip URL if user pastes full link
      .replace(/[^a-zA-Z0-9_-]/g, '') // remove invalid chars

    if (!cleanId) return false
    navigate(`/room/${cleanId}`)
    return true
  }, [navigate])

  const leaveRoom = useCallback(() => {
    navigate('/')
  }, [navigate])

  return { createRoom, joinRoom, leaveRoom }
}