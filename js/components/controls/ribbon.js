import { Component, Fragment, createElement as e } from 'react';
import { draggable } from './draggable.js';

export class Ribbon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            value: 0
        };
    }

    componentDidMount() {
        const _draggable = draggable(this.element);
        const { onChange } = this.props;


        _draggable.on('dragStart', e => {
            document.body.style.userSelect = 'none';
            const rect = this.element.getBoundingClientRect();
            this.setState({
                pressed: true,
                value: Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
            }, () => onChange(this.state));
        });

        _draggable.on('dragEnd', () => {
            document.body.style.userSelect = '';
            this.setState({
                pressed: false
            }, () => onChange(this.state));
        });

        _draggable.on('drag', e => {
            const rect = this.element.getBoundingClientRect();
            this.setState({
                value: Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
            }, () => onChange(this.state));
        });
    }

    render() {
        return e('div', {
            className: 'keyboard',
            ref: element => this.element = element
        }, e(Keys));
    }
}

function Keys() {
    return e(Fragment, null,
        e('span', { className: 'key' }),
        e('span', { className: 'key key_black' }),
        e('span', { className: 'key key_narrow' }),
        e('span', { className: 'key key_narrow' }),
        e('span', { className: 'key key_black' }),
        e('span', { className: 'key' }),
        e('span', { className: 'key key_black' }),
        e('span', { className: 'key key_narrow' }),
        e('span', { className: 'key key_narrow' }),
        e('span', { className: 'key key_black' }),
        e('span', { className: 'key' }),
        e('span', { className: 'key key_black' }),
        e('span', { className: 'key' }),
        e('span', { className: 'key key_black' }),
        e('span', { className: 'key key_narrow' }),
        e('span', { className: 'key key_narrow' }),
        e('span', { className: 'key key_black' }),
        e('span', { className: 'key' }),
    );
}
