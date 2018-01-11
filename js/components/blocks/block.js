import { createElement as e } from '../../lib/React.js';

export function Block(props) {
    return e('fieldset', { className: 'block' },
        e('legend', { className: 'block__title' }, props.title),
        e('div', { className: 'block__params' }, props.children.map((child, i) => {
            return e('legend', {
                className: 'block__param',
                key: i
            }, child);
        }))
    );
}

export function Param(props) {
    return e('label', { className: 'param' },
        e('span', {
            className: 'param__knob' + (props.led ? ' param__knob_led' : '')
        }, props.children),
        e('span', { className: 'param__title' }, props.title)
    );
}
