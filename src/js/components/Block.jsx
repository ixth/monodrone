import React, { memo } from 'react';
import { Children } from 'react';

const Block = memo(({ title, children }) => (
    <fieldset className="block">
        <legend className="block__title">
            {title}
        </legend>
        <div className="block__params">
            {Children.map(children, (child, i) =>
                <legend className="block__param" key={i}>
                    {child}
                </legend>
            )}
        </div>
    </fieldset>
));

export default Block;
