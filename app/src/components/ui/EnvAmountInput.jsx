import { PLACEHOLDERS } from "../../config/Constants.js";

export default function EnvAmountInput({value, onChange }) {
    return (
        <input
            type="number"
            step="0.01"
            className="env-input"
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder={PLACEHOLDERS.INPUT}
        />
    )
}
