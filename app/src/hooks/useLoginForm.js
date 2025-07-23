import { useState } from 'react'
import { API_BASE, ERRORS } from '../config/Constants.js'

export default function useLoginForm(onSuccess) {
    const [uname, setUname] = useState('')
    const [pass, setPass] = useState('')
    const [show, setShow] = useState(false)
    const [err, setErr] = useState('')

    const body = () => JSON.stringify({ username: uname, password: pass })

    const hit = path => {
        if (!uname.trim() || !pass) {
            setErr(ERRORS.MISSING_FIELDS)
            return
        }

        setErr('')
        fetch(`${API_BASE}/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: body()
        }).then(async r => {

            if (r.ok)
                return onSuccess()

            if (r.status === 400)
                setErr(await r.text() === 'short' ? ERRORS.PASSWORD_SHORT : ERRORS.MISSING_FIELDS)

            else if (r.status === 401)
                setErr(ERRORS.WRONG_CREDENTIALS)

            else if (r.status === 409)
                setErr(ERRORS.USERNAME_EXISTS)

            else if (r.status === 429)
                setErr(ERRORS.TOO_MANY_ATTEMPTS)

            else
                setErr(ERRORS.UNEXPECTED)

        }).catch(() => setErr(ERRORS.SERVER_UNREACHABLE))
    }

    return {
        uname, setUname, pass, setPass, show, setShow, err, setErr, hit
    }
}
