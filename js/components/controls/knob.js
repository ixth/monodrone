import { draggable } from './draggable.js';
import { Component, createElement as e } from '../../lib/React.js';

export function KnobComponent({ min, max, value, onChange }) {
    return e(Knob, {
        value: value / (max - min),
        onChange: e => onChange({
            value: min + e.value * (max - min)
        })
    });
}

KnobComponent.defaultProps = {
    min: 0,
    max: 100
};


class Knob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: props.value * props.spread
        };
        this._offset = (1 - props.spread) / 2;
    }

    componentDidMount() {
        const _draggable = draggable(this.knob);

        _draggable.on('dragStart', () => {
            document.body.style.cursor = '-webkit-grabbing';
            document.body.style.userSelect = 'none';
        });

        _draggable.on('dragEnd', () => {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        });

        const { spread, onChange } = this.props;
        _draggable.on('drag', e => {
            if (isNaN(e.angleDelta)) {
                return;
            }

            const angle = this.state.angle + e.angleDelta;
            this.setState({
                angle: Math.min(Math.max(angle, 0), spread)
            }, () => {
                onChange({
                    value: this.state.angle
                })
            });
        });
    }

    render() {
        return e('span', {
            ref: element => this.knob = element,
            className: 'knob',
            style: {
                transform: `rotate(${this._offset + this.state.angle}turn)`
            }
        });
    }
}

Knob.defaultProps = {
    spread: 280 / 360,
    value: 0
};
