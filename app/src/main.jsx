import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import AuthApp from './components/AuthApp.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthApp />
    </StrictMode>
)
