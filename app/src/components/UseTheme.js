import { useEffect, useState } from 'react'
import { THEME_TRANSITION_TIMEOUT } from '../config/Constants.js'

export default function useTheme(defaultDark = true) {
    const [dark, setDark] = useState(defaultDark)

    useEffect(() => {
        document.body.classList.add('theme-transition')
        document.body.classList.toggle('dark', dark)

        const timeout = setTimeout(() => document.body.classList.remove('theme-transition'), THEME_TRANSITION_TIMEOUT)

        return () => clearTimeout(timeout)
    }, [dark])

    return [dark, setDark]
}
