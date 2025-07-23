import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useTheme from '../components/UseTheme.js'
import useSocket from '../hooks/useSocket.js'
import useEnvelopeLogic from '../hooks/useEnvelopeLogic.js'
import { useNetworkUtils } from '../hooks/useNetworkUtils.js'
import ThemeToggle from '../components/ui/ThemeToggle.jsx'
import IncomeInput from '../components/ui/IncomeInput.jsx'
import EnvelopeInput from '../components/ui/EnvelopeInput.jsx'
import EnvelopeList from '../components/ui/EnvelopeList.jsx'
import { DEFAULT_THEME, PLACEHOLDERS } from '../config/Constants.js'
import '../assets/base.css'
import '../assets/layout.css'
import '../assets/input.css'
import '../assets/envelope.css'
import '../assets/dark.css'
import '../assets/theme-toggle.css'

export default function App() {
    const [state, setState] = useState({ income: 0, envelopes: [] })
    const [orderedEnvelopes, setOrderedEnvelopes] = useState([])
    const [envAmounts, setEnvAmounts] = useState({})
    const [amount, setAmount] = useState('')
    const [newName, setNewName] = useState('')
    const [dark, setDark] = useTheme(DEFAULT_THEME)

    const { send, deleteEnvelope, handleLogout } = useNetworkUtils()
    useSocket(setState, setOrderedEnvelopes)

    const {
        tryMove, trySpend, tryTake, moveEnvelope, findEnvelope, handleDrop, handleAddIncome, handleAddEnvelope
    } = useEnvelopeLogic(state, envAmounts, setOrderedEnvelopes, send)

    const parsedGlobal = parseFloat(amount)

    return (
        <DndProvider backend={HTML5Backend}>
        <div id="theme-background">
        <div className="app-container">

            <ThemeToggle dark={dark} toggle={() => setDark(d => !d)} />
            <button className="logout-button" onClick={handleLogout}>{PLACEHOLDERS.LOGOUT}</button>

            <div className="card">
                <h1 className="title">{PLACEHOLDERS.CARD_TITLE}</h1>

                <div className="income">{PLACEHOLDERS.INCOME}{parseFloat(state.income).toFixed(2)}</div>

                <IncomeInput
                    amount={amount}
                    setAmount={setAmount}
                    onSubmit={() => handleAddIncome(parsedGlobal)}
                />

                <EnvelopeInput
                    newName={newName}
                    setNewName={setNewName}
                    onSubmit={() => handleAddEnvelope(newName)}
                />

                <EnvelopeList
                    envelopes={orderedEnvelopes}
                    envAmounts={envAmounts}
                    setEnvAmounts={setEnvAmounts}
                    tryMove={tryMove}
                    trySpend={trySpend}
                    tryTake={tryTake}
                    deleteEnvelope={deleteEnvelope}
                    moveEnvelope={moveEnvelope}
                    findEnvelope={findEnvelope}
                    handleDrop={handleDrop}
                />
            </div>

        </div>
        </div>
        </DndProvider>
    )
}
