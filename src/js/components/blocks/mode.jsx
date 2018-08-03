import { turnOff, setLfoShape } from '../../actions';

const Position = ({ name, label, value, checked, onChange }) => (
    <label className='switch__position'>
        <input
            className='switch__input'
            type='radio'
            name={name}
            value={value}
            defaultChecked={checked}
            onChange={onChange}
        />
        <span className='switch__knob'/>
        {label}
    </label>
);

export const Mode = ({ value }) => (
    <fieldset className='switch'>
        <Position
            name='mode'
            label='Standby'
            key='standby'
            value='standby'
            checked={value === 'standby'}
            onChange={turnOff}
        />
        <Position
            name='mode'
            label='⋀'
            key='sawtooth'
            value='sawtooth'
            checked={value === 'sawtooth'}
            onChange={setLfoShape.bind(null, 'sawtooth')}
        />
        <Position
            name='mode'
            label='⎍'
            value='square'
            checked={value === 'square'}
            onChange={setLfoShape.bind(null, 'square')}
        />
    </fieldset>
);
