import { FC, memo, useCallback, useState } from 'react';

import Knob, { PropTypes as KnobPropTypes } from './controlled';

export type PropTypes = Omit<KnobPropTypes, 'value'> & { initialValue?: number };

type OnChangeCallback = Exclude<KnobPropTypes['onChange'], undefined>;

const UncontrolledKnob: FC<PropTypes> = memo(
    ({ initialValue = 0, spread = 280 / 360, onChange }) => {
        const [value, setValue] = useState(initialValue);
        const handleChange = useCallback<OnChangeCallback>(
            (e) => {
                setValue(e.value);
                onChange?.(e);
            },
            [onChange, setValue]
        );
        return <Knob spread={spread} value={value} onChange={handleChange} />;
    }
);

export default UncontrolledKnob;
