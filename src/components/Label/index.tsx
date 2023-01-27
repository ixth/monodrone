import { FC } from 'react';
import cn from 'clsx';

import './styles/style.css';

export interface PropTypes {
    className?: string;
    wide?: boolean;
}

const Label: FC<PropTypes> = ({ className, children, wide }) => (
    <label className={cn('label', className, { label_wide: wide })}>{children}</label>
);

export default Label;
