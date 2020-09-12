import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Param = ({ title, led, children }) => (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="param">
        <span className={classnames('param__knob', { param__knob_led: led })}>{children}</span>
        <span className="param__title">{title}</span>
    </label>
);

Param.propTypes = {
    title: PropTypes.string.isRequired,
    led: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Param.defaultProps = {
    led: false,
};

export default memo(Param);
