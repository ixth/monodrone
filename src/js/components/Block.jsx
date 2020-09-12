import PropTypes from 'prop-types';
import React, { memo, Children } from 'react';

const Block = ({ title, children }) => (
    <fieldset className="block">
        <legend className="block__title">{title}</legend>
        <div className="block__params">
            {Children.map(children, (child) => (
                <legend className="block__param">{child}</legend>
            ))}
        </div>
    </fieldset>
);

Block.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default memo(Block);
