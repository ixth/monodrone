import { FC } from 'react';
import cn from 'clsx';

import './styles/param.css';

export interface PropTypes {
    title: string;
    led?: boolean;
}

const Param: FC<PropTypes> = ({ title, led = false, children }) => (
    <label className="param">
        <span className={cn('param__knob', { param__knob_led: led })}>{children}</span>
        <span className="param__title">{title}</span>
    </label>
);

export default Param;
