import { setOscGain, setOscFrequency } from '../../actions';
import { Ribbon as RibbonControl } from '../controls/ribbon';

export const Ribbon = () => (
    <RibbonControl
        onChange={(e) => {
            setOscGain(e.pressed ? 1 : 0);
            setOscFrequency(23 * Math.pow(1.886525, 8 * e.value));
        }}
    />
);
