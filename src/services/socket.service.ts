import { io, Socket } from 'socket.io-client'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../store/slices/auth.slice'
import { changeTracking } from '../store/slices/app.slice'

const URL = import.meta.env.VITE_URL

export function useSocket() {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (!socket && token) {
      const newSocket = io(URL, {
        auth: {
          token: `${token}`,
        },
      })
      if (newSocket) {
        newSocket.on('connect', () => {
          console.log('connected')
          newSocket.on('new_start_tracking', data => {
            console.log('start tracking', data)
            dispatch(changeTracking({ state: true }))
          })

          newSocket.on('new_stop_tracking', () => {
            console.log('stop tracking')
            dispatch(changeTracking({ state: false }))
          })
        })
        setSocket(newSocket)
      }
    }
  }, [dispatch, socket, token])

  return {
    socket,
  }
}
