import { MIN_AMOUNT, ERRORS } from '../config/Constants.js'

export default function useEnvelopeLogic(state, envAmounts, setOrderedEnvelopes, send) {
    const getVal = id => parseFloat(envAmounts[id])

    const validateAmount = (val, max, errMsg) => {
        if (val < MIN_AMOUNT || isNaN(val))
            return ERRORS.INVALID_AMOUNT

        if (val > parseFloat(max))
            return errMsg
    }

    const tryAction = (type, id, val, max, errMsg) => {
        const err = validateAmount(val, max, errMsg)

        if (err)
            return alert(err)

        send(type, 'POST', { id, amount: val })
    }

    const tryMove = id => {
        const val = getVal(id)
        tryAction('move', id, val, state.income, ERRORS.NOT_ENOUGH_INCOME)
    }

    const trySpend = env => {
        const val = getVal(env.id)
        tryAction('spend', env.id, val, env.amount, ERRORS.NOT_ENOUGH_FUNDS)
    }

    const tryTake = env => {
        const val = getVal(env.id)
        tryAction('take', env.id, val, env.amount, ERRORS.NOT_ENOUGH_FUNDS)
    }

    const moveEnvelope = (draggedId, overIndex, envelopes) => {
        const fromIndex = envelopes.findIndex(e => e.id === draggedId)
        const updated = [...envelopes]
        const [moved] = updated.splice(fromIndex, 1)

        updated.splice(overIndex, 0, moved)
        setOrderedEnvelopes(updated)
    }

    const findEnvelope = (id, envelopes) => {
        const index = envelopes.findIndex(e => e.id === id)

        return { env: envelopes[index], index }
    }

    const handleDrop = envelopes => {
        const newOrder = envelopes.map(e => e.id)

        send('reorder', 'POST', { newOrder })
    }

    const handleAddIncome = parsed => {
        if (parsed < MIN_AMOUNT || isNaN(parsed))
            return alert(ERRORS.INVALID_AMOUNT)

        send('income', 'POST', { amount: parsed })
    }

    const handleAddEnvelope = name => {
        if (!name.trim())
            return

        send('envelope', 'POST', { name })
    }

    return {
        tryMove, trySpend, tryTake, moveEnvelope, findEnvelope, handleDrop, handleAddIncome, handleAddEnvelope
    }
}
