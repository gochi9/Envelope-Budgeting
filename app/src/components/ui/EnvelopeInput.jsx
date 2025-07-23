import { PLACEHOLDERS } from '../../config/Constants.js'

export default function EnvelopeInput({ newName, setNewName, onSubmit }) {
    return (
        <div className="input-group">
            <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder={PLACEHOLDERS.NEW_ENVELOPE_NAME}
            />
            <button onClick={onSubmit}>{PLACEHOLDERS.ADD_ENVELOPE}</button>
        </div>
    )
}
