import { Children } from 'react';
import classnames from 'classnames';

export const Block = ({ title, children }) => (
    <fieldset className='block'>
        <legend className='block__title'>
            {title}
        </legend>
        <div className='block__params'>
            {
                Children.map(children, (child, i) =>
                    <legend className='block__param' key={i}>{child}</legend>)
            }
        </div>
    </fieldset>
);

export const Param = ({ title, led, children }) => (
    <label className='param'>
        <span className={classnames('param__knob', { 'param__knob_led': led })}>{children}</span>
        <span className='param__title'>{title}</span>
    </label>
);
