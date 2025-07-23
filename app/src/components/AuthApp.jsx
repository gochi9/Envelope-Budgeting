import { useEffect, useState } from 'react'
import { API_BASE, PLACEHOLDERS } from "../config/Constants.js";
import Login from '../View/Login.jsx'
import App from '../View/App.jsx'

export default function AuthApp() {
    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(true)

    const check = () =>
        fetch(`${API_BASE}/me`, { credentials: 'include' })
            .then(r => setOk(r.ok))
            .finally(() => setLoading(false))

    useEffect(() => { check().catch(() => {}) }, [])

    useEffect(() => { document.title = `${PLACEHOLDERS.CARD_TITLE}` }, [])

    return loading ? null : (ok ? <App /> : <Login onSuccess={() => setOk(true)} />)
}
