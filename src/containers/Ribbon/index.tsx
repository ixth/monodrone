import { useCallback, VFC } from 'react';
import { DraggableEventHandler } from 'react-draggable';
import { useDispatch } from 'react-redux';

import Ribbon from 'components/Ribbon';
import { setOscFrequency, setOscGain } from 'reducers/osc';

import { getFrequency } from './utils';

const RibbonContainer: VFC = () => {
    const dispatch = useDispatch();

    const onStart = useCallback<DraggableEventHandler>(
        (_, { x, node }) => {
            dispatch(setOscFrequency(getFrequency(Math.clamp(x / node.offsetWidth, 0, 1))));
            dispatch(setOscGain(1));
        },
        [dispatch]
    );

    const onDrag = useCallback<DraggableEventHandler>(
        (_, { x, node }) => {
            dispatch(setOscFrequency(getFrequency(x / node.offsetWidth)));
        },
        [dispatch]
    );

    const onStop = useCallback<DraggableEventHandler>(() => {
        dispatch(setOscGain(0));
    }, [dispatch]);

    return <Ribbon onStart={onStart} onDrag={onDrag} onStop={onStop} />;
};

export default RibbonContainer;
