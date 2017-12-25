import React from '../../lib/React.js';
const e = React.createElement;
const Component = React.Component;

import { Block, Param } from './block.js';
import { KnobComponent } from '../controls/knob.js';

import { store } from '../../store.js';
import { actions } from '../../actions.js';

export class Delay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: store.delay.time,
            feedback: store.delay.feedback
        };
    }

    componentDidMount() {
        store.on('change', () => {
            this.setState({
                time: store.delay.time,
                feedback: store.delay.feedback
            });
        });
    }

    render() {
        return e(Block, { title: 'Delay' }, [
            e(Param, { title: 'Time', key: 'time' },
                e(KnobComponent, {
                    min: this.props.time.min,
                    max: this.props.time.max,
                    value: this.state.time,
                    onChange: e => actions.setDelayTime(e.value)
                })
            ),
            e(Param, { title: 'Feedback', key: 'feedback' },
                e(KnobComponent, {
                    min: this.props.feedback.min,
                    max: this.props.feedback.max,
                    value: this.state.feedback,
                    onChange: e => actions.setDelayFeedback(e.value)
                })
            )
        ]);
    }
}

Delay.defaultProps = {
    time: {
        min: .05,
        max: 2
    },
    feedback: {
        min: 0,
        max: 1.5
    }
};
