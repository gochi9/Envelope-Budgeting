export default function ThemeToggle({ dark, toggle }) {
    return (
        //This should trigger nightmares
        <div className="theme-toggle" onClick={toggle}>
        <div className="toggle-track">
        <div className={`toggle-thumb ${dark ? 'on' : ''}`}>
            {dark ? '🌙' : '☀️'}
        </div>
        </div>
        </div>
    )
}
