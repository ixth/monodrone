import React, { useCallback, useState, VFC } from 'react';
import useEventListener from '@use-it/event-listener';

import './styles/keyboard.css';

interface PropTypes {
    onStart: (e: MouseEvent) => void;
    onStop: (e: MouseEvent) => void;
    onDrag: (e: MouseEvent) => void;
}

const Ribbon: VFC<PropTypes> = ({ onStart, onDrag, onStop }) => {
    const [isDown, setIsDown] = useState(false);

    const onMouseDown = useCallback(
        (e: React.MouseEvent) => {
            setIsDown(true);
            onStart?.(e.nativeEvent);
        },
        [onStart]
    );

    const onMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (isDown) {
                onDrag?.(e.nativeEvent);
            }
        },
        [isDown, onDrag]
    );

    const onMouseUp = useCallback(
        (e: MouseEvent) => {
            onStop?.(e);
            setIsDown(false);
        },
        [onStop]
    );

    useEventListener('mouseup', onMouseUp, window);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="keyboard" onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
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
        </div>
    );
};

export default Ribbon;
