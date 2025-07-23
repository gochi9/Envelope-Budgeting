import DraggableEnvelope from '../DraggableEnvelope.jsx'
import EnvelopeActions from './EnvelopeActions.jsx'
import EnvAmountInput from './EnvAmountInput.jsx'

export default function EnvelopeList({envelopes, envAmounts, setEnvAmounts, tryMove, trySpend, tryTake, deleteEnvelope, moveEnvelope, findEnvelope, handleDrop}) {
    return (
        <div className="envelope-list">
            {envelopes.map(env => (
                <DraggableEnvelope
                    key={env.id}
                    env={env}
                    moveEnvelope={(id, i) => moveEnvelope(id, i, envelopes)}
                    findEnvelope={id => findEnvelope(id, envelopes)}
                    handleDrop={() => handleDrop(envelopes)}
                >
                    <div className="env-top">
                        <div>
                            <div className="env-name">{env.name}</div>
                            <div className="env-amount">${parseFloat(env.amount).toFixed(2)}</div>
                        </div>
                        <EnvAmountInput
                            envId={env.id}
                            value={envAmounts[env.id]}
                            onChange={val => setEnvAmounts({ ...envAmounts, [env.id]: val })}
                        />
                    </div>
                    <EnvelopeActions
                        env={env}
                        tryMove={tryMove}
                        trySpend={trySpend}
                        tryTake={tryTake}
                        deleteEnvelope={deleteEnvelope}
                    />
                </DraggableEnvelope>
            ))}
        </div>
    )
}
