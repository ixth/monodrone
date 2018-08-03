import { Component, Fragment } from 'react';
import { draggable } from './draggable';

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
        return (
            <div
                className='keyboard'
                ref={element => { this.element = element; }}
            >
                <Keys />
            </div>
        );
    }
}

const Keys = () => (
    <Fragment>
        <span className='key' />
        <span className='key key_black' />
        <span className='key key_narrow' />
        <span className='key key_narrow' />
        <span className='key key_black' />
        <span className='key' />
        <span className='key key_black' />
        <span className='key key_narrow' />
        <span className='key key_narrow' />
        <span className='key key_black' />
        <span className='key' />
        <span className='key key_black' />
        <span className='key' />
        <span className='key key_black' />
        <span className='key key_narrow' />
        <span className='key key_narrow' />
        <span className='key key_black' />
        <span className='key' />
    </Fragment>
);
