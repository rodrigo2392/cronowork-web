import { io, Socket } from 'socket.io-client'
import store from '../store'
import { changeTracking } from '../store/slices/app.slice'

const URL = `http://localhost:4001`

export default class SocketManager {
  private static instance: SocketManager
  public socket: Socket | null = null

  private constructor() {
    const token = store.getState().authState.token
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
          store.dispatch(changeTracking({ state: true }))
        })

        newSocket.on('new_stop_tracking', () => {
          console.log('stop tracking')
          store.dispatch(changeTracking({ state: false }))
        })
      })
      this.socket = newSocket
    }
  }

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager()
    }

    return SocketManager.instance
  }

  public emit(eventName: string) {
    this.socket?.emit(eventName)
  }
}
