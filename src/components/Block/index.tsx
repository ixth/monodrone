import { Children, memo, ReactNode, VFC } from 'react';

import './styles/block.css';

export type PropTypes = {
    title: string;
    children: ReactNode;
};

const Block: VFC<PropTypes> = memo(({ title, children }) => (
    <fieldset className="block">
        <legend className="block__title">{title}</legend>
        <div className="block__params">
            {Children.map(children, (child) => (
                <legend className="block__param">{child}</legend>
            ))}
        </div>
    </fieldset>
));

export default Block;
