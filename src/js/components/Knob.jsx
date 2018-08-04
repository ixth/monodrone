import { Component } from 'react';
import draggable from './draggable';

class Knob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: props.value * props.spread,
        };
        this._offset = (1 - props.spread) / 2;
    }

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

            const angle = this.state.angle + e.angleDelta;
            this.setState({
                angle: Math.min(Math.max(angle, 0), spread)
            }, () => {
                onChange({
                    value: this.state.angle,
                })
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
        return <span
            ref={(element) => this.knob = element }
            className="knob"
            style={({
                transform: `rotate(${this._offset + this.state.angle}turn)`,
            })}
        />;
    }
}

Knob.defaultProps = {
    spread: 280 / 360,
    value: 0
};

export default Knob;
