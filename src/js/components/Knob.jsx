import { Component } from 'react';
import draggable from './draggable';

class Knob extends Component {
    componentDidMount() {
        const dragStart = () => {
            document.body.style.cursor = '-webkit-grabbing';
            document.body.style.userSelect = 'none';
        };

        const dragEnd = () => {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        const { spread, onChange } = this.props;
        const drag = (e) => {
            if (isNaN(e.angleDelta)) {
                return;
            }

            onChange({
                value: Math.max(0, Math.min(1, this.props.value + e.angleDelta / spread)),
            });
        };

        this.unsubscribe = draggable(this.knob, {
            dragStart,
            drag,
            dragEnd,
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { value, spread } = this.props;
        const offset = (1 - spread) / 2;

        return <span
            ref={(element) => this.knob = element }
            className="knob"
            style={({
                transform: `rotate(${offset + value * spread}turn)`,
            })}
        />;
    }
}

Knob.defaultProps = {
    spread: 280 / 360,
    value: 0
};

export default Knob;
