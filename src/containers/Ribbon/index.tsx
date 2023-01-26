import { useCallback, VFC } from 'react';
import { useDispatch } from 'react-redux';

import Ribbon from 'components/Ribbon';
import { setOscFrequency, setOscGain } from 'reducers/osc';
import { clamp } from '../../utils';

import { getFrequency } from './utils';

const getRatio = (e: MouseEvent) =>
    clamp(e.offsetX / (e.currentTarget as HTMLElement).offsetWidth, 0, 1);

const RibbonContainer: VFC = () => {
    const dispatch = useDispatch();

    const onStart = useCallback(
        (e: MouseEvent) => {
            dispatch(setOscFrequency(getFrequency(getRatio(e))));
            dispatch(setOscGain(1));
        },
        [dispatch]
    );

    const onDrag = useCallback(
        (e: MouseEvent) => {
            dispatch(setOscFrequency(getFrequency(getRatio(e))));
        },
        [dispatch]
    );

    const onStop = useCallback(() => {
        dispatch(setOscGain(0));
    }, [dispatch]);

    return <Ribbon onStart={onStart} onDrag={onDrag} onStop={onStop} />;
};

export default RibbonContainer;
