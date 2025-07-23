export default function EnvelopeActions({ env, tryMove, trySpend, tryTake, deleteEnvelope }) {
    return (
        <div className="env-actions">
            <button onClick={() => tryMove(env.id)}>Move</button>
            <button onClick={() => trySpend(env)}>Spend</button>
            <button onClick={() => tryTake(env)}>Take</button>
            <button onClick={() => deleteEnvelope(env.id)}>Remove</button>
        </div>
    )
}
