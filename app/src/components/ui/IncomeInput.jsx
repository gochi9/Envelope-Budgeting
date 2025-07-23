import { PLACEHOLDERS } from '../../config/Constants.js'

export default function IncomeInput({ amount, setAmount, onSubmit }) {
    return (
        <div className="input-group">
            <input
                type="number"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder={PLACEHOLDERS.INPUT}
            />
            <button onClick={onSubmit}>{PLACEHOLDERS.ADD_INCOME}</button>
        </div>
    )
}
