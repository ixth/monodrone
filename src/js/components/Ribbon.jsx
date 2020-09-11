import { connect } from 'react-redux';
import { setOscGain, setOscFrequency } from 'reducers/osc';
import { clamp } from 'lib/utils';

import { DraggableCore } from 'react-draggable';


const getFrequency = (ratio) => 23 * Math.pow(1.886525, 8 * clamp(0, 1, ratio));

const Ribbon = ({ setOscGain, setOscFrequency }) => (
    <div className="keyboard">
        <DraggableCore
            enableUserSelectHack={true}
            onStart={
                (_, {x, node}) => {
                    setOscFrequency(getFrequency(x / node.offsetWidth));
                    setOscGain(1);
                }
            }
            onDrag={
                (_, {x, node}) => {
                    setOscFrequency(getFrequency(x / node.offsetWidth));
                }
            }
            onStop={setOscGain.bind(null, 0)}
        >
            <div className="keyboard__keys">
                <span className="key" />
                <span className="key key_black" />
                <span className="key key_narrow" />
                <span className="key key_narrow" />
                <span className="key key_black" />
                <span className="key" />
                <span className="key key_black" />
                <span className="key key_narrow" />
                <span className="key key_narrow" />
                <span className="key key_black" />
                <span className="key" />
                <span className="key key_black" />
                <span className="key" />
                <span className="key key_black" />
                <span className="key key_narrow" />
                <span className="key key_narrow" />
                <span className="key key_black" />
                <span className="key" />
            </div>
        </DraggableCore>
    </div>
);

export default connect(null, {
    setOscGain,
    setOscFrequency,
})(Ribbon);
