import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'

export default function DraggableEnvelope({ env, moveEnvelope, findEnvelope, handleDrop, children }) {
    const ref = useRef(null)
    const id = env.id

    const [, drop] = useDrop({
        accept: 'ENVELOPE',
        hover(item) {
            if (!ref.current || item.id === id)
                return

            const { index: from } = findEnvelope(item.id)
            const { index: to } = findEnvelope(id)

            if (from === to)
                return

            moveEnvelope(item.id, to)
            item.index = to
        },
        drop: handleDrop
    })

    const [, drag] = useDrag({
        type: 'ENVELOPE',
        item: () => ({ id, index: findEnvelope(id).index })
    })

    drag(drop(ref))

    return (
        <div ref={ref} className="envelope">
            {children}
        </div>
    )
}
