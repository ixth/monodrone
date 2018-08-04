import { Component } from 'react';
import { connect } from 'react-redux';
import { setOscGain, setOscFrequency } from '../reducers/osc';

import draggable from './draggable';
import Keys from './keys';


class Ribbon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            value: 0
        };
    }

    onChange() {
        const { setOscGain, setOscFrequency } = this.props;
        setOscGain(this.state.pressed ? 1 : 0);
        setOscFrequency(23 * Math.pow(1.886525, 8 * this.state.value));
    }

    componentDidMount() {
        const onChange = this.onChange.bind(this);
        const dragStart = (e) => {
            document.body.style.userSelect = 'none';
            const rect = this.element.getBoundingClientRect();
            this.setState({
                pressed: true,
                value: Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
            }, onChange);
        };

        const dragEnd = () => {
            document.body.style.userSelect = '';
            this.setState({
                pressed: false
            }, onChange);
        };

        const drag = (e) => {
            const rect = this.element.getBoundingClientRect();
            this.setState({
                value: Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
            }, onChange);
        };

        this.unsubscribe = draggable(this.element, {
            dragStart,
            dragEnd,
            drag,
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className='keyboard' ref={element => { this.element = element; }}>
                <Keys />
            </div>
        );
    }
};

export default connect(null, {
    setOscGain,
    setOscFrequency,
})(Ribbon);
