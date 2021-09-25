import { VFC } from 'react';
import { DraggableCore, DraggableCoreProps } from 'react-draggable';

import './styles/keyboard.css';

type PropTypes = Pick<DraggableCoreProps, 'onStart' | 'onDrag' | 'onStop'>;

const Ribbon: VFC<PropTypes> = ({ onStart, onDrag, onStop }) => (
    <div className="keyboard">
        <DraggableCore enableUserSelectHack onStart={onStart} onDrag={onDrag} onStop={onStop}>
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

export default Ribbon;
