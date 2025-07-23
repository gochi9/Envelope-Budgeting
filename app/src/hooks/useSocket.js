import { useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { API_BASE } from '../config/Constants.js'

export default function useSocket(setState, setOrderedEnvelopes) {
    const socketRef = useRef(null)

    useEffect(() => {
        const s = io(API_BASE, { withCredentials: true })
        socketRef.current = s

        s.on('state', newState => {
            setState(newState)
            setOrderedEnvelopes(newState.envelopes)
        })

        s.on('refresh', () => {
            fetch(`${API_BASE}/state`, { credentials: 'include' })
                .then(r => r.json())
                .then(data => {
                    setState(data)
                    setOrderedEnvelopes(data.envelopes)
                })
        })

        s.emit('getState')

        return () => s.disconnect()
    }, [setOrderedEnvelopes, setState])

    return socketRef
}
