import { FC } from 'react';
import cn from 'clsx';

import './styles/style.css';

export interface PropTypes {
    className?: string;
    wide?: boolean;
}

const Legend: FC<PropTypes> = ({ className, children, wide }) => (
    <legend className={cn('legend', className, { legend_wide: wide })}>{children}</legend>
);

export default Legend;
