import DraggableAngle from './DraggableAngle';
import { noop, clamp } from '../lib/utils';

const dragStart = () => {
    document.body.style.cursor = '-webkit-grabbing';
};

const dragEnd = () => {
    document.body.style.cursor = '';
};

const Knob = ({ value = 0, spread = 280 / 360, onChange = noop }) => (
    <span className="knob">
        <DraggableAngle
            enableUserSelectHack={true}
            onStart={dragStart}
            onStop={dragEnd}
            onDrag={
                (e, data) => {
                    onChange({
                        value: clamp(0, 1, value + data.deltaAngle / (spread * 2 * Math.PI)),
                    })
                }
            }
        >
            <span
                className="knob__handle"
                style={({
                    transform: `rotate(${((1 - spread) / 2)}turn) rotate(${value * spread}turn)`,
                })}
            />
        </DraggableAngle>
    </span>
);

export default Knob;
