import { FC, memo } from 'react';
import cn from 'classnames';

export type PropTypes = {
    title: string;
    led?: boolean;
};

const Param: FC<PropTypes> = memo(
    ({ title, led = false, children }) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className="param">
            <span className={cn('param__knob', { param__knob_led: led })}>{children}</span>
            <span className="param__title">{title}</span>
        </label>
    )
);

export default Param;
