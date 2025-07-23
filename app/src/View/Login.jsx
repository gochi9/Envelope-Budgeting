import useTheme from '../components/UseTheme.js'
import useLoginForm from '../hooks/useLoginForm.js'
import ThemeToggle from '../components/ui/ThemeToggle.jsx'
import LoginForm from '../components/ui/LoginForm.jsx'
import { DEFAULT_THEME } from '../config/Constants.js'
import '../assets/base.css'
import '../assets/layout.css'
import '../assets/input.css'
import '../assets/dark.css'
import '../assets/theme-toggle.css'

export default function Login({ onSuccess }) {
    const [dark, setDark] = useTheme(DEFAULT_THEME)
    const form = useLoginForm(onSuccess)

    return (
        <div id="theme-background">
        <div className="app-container">

            <ThemeToggle dark={dark} toggle={() => setDark(d => !d)} />

            <LoginForm {...form} />

        </div>
        </div>
    )
}
