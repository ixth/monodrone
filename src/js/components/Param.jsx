import React, { memo } from 'react';
import classnames from 'classnames';

const Param = memo(({ title, led, children }) => (
    <label className="param">
        <span className={classnames('param__knob', { 'param__knob_led': led })}>
            {children}
        </span>
        <span className='param__title'>
            {title}
        </span>
    </label>
));

export default Param;
