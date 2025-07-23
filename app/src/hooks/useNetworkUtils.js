import { API_BASE } from '../config/Constants.js'

export function useNetworkUtils() {
    const send = (path, method, data) => {
        fetch(`${API_BASE}/${path}`, {
            credentials: 'include',
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(() => {})
    }

    const deleteEnvelope = id => {
        fetch(`${API_BASE}/envelope/${id}`, {
            credentials: 'include',
            method: 'DELETE'
        }).catch(() => {})
    }

    const handleLogout = () => {
        fetch(`${API_BASE}/logout`, {
            method: 'POST',
            credentials: 'include'
        }).then(() => location.reload())
    }

    return { send, deleteEnvelope, handleLogout }
}
