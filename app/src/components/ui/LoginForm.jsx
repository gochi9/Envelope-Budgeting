import { MAX_USERNAME_LENGTH, MAX_PASSWORD_LENGTH, PLACEHOLDERS } from '../../config/Constants.js'

export default function LoginForm({uname, setUname, pass, setPass, show, setShow, err, hit}) {
    return (
        <div className="login-card">

            <h1 className="title">Login</h1>

            <div className="input-group">
                <input
                    value={uname}
                    placeholder={PLACEHOLDERS.USERNAME}
                    maxLength={MAX_USERNAME_LENGTH}
                    onChange={e => setUname(e.target.value)}
                />
            </div>

            <div className="input-group" style={{ position: 'relative' }}>
                <input
                    type={show ? 'text' : 'password'}
                    value={pass}
                    maxLength={MAX_PASSWORD_LENGTH}
                    placeholder={PLACEHOLDERS.PASSWORD}
                    onChange={e => setPass(e.target.value)}
                />
                <span
                    onClick={() => setShow(s => !s)}
                    className="password-toggle"
                >
                    {show ? '👁️' : '👁️‍🗨️'}
                </span>
            </div>

            <div className={`error-message ${err ? 'visible' : ''}`}>
                {err || 'placeholder'}
            </div>

            <div className="input-group center">
                <button onClick={() => hit('login')}>Login</button>
                <button onClick={() => hit('register')}>Register</button>
            </div>

        </div>
    )
}
