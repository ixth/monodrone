import { Audio } from './audio.js';
import { Mode } from './blocks/mode.js';
import { Lfo } from './blocks/lfo.js';
import { Vcf } from './blocks/vcf.js';
import { Delay } from './blocks/delay.js';
import { Ribbon } from './blocks/ribbon.js';

import { store } from '../store.js';

import React from '../lib/React.js';

const e = React.createElement;
const Component = React.Component;

export class Monotron extends Component {
    constructor(props) {
        super(props);
        this.state = store;
    }

    componentDidMount() {
        store.on('change', () => {
            this.setState(store);
        });
    }

    render() {
        return e('div', { className: 'device' },
            e(Audio),
            e('div', { className: 'device__blocks' },
                e(Mode, {
                    value: store.standby ? 'standby' : store.lfo.shape
                }),
                e(Lfo, {
                    frequency: {
                        min: 1,
                        max: 50,
                        value: this.state.lfo.frequency
                    },
                    intensity: {
                        min: 0,
                        max: 10,
                        value: this.state.lfo.intensity
                    }
                }),
                e(Vcf, {
                    cutoff: {
                        min: 20,
                        max: 20000,
                        value: this.state.vcf.cutoff
                    }
                }),
                e(Delay, {
                    time: {
                        min: .05,
                        max: 2,
                        value: this.state.delay.time
                    },
                    feedback: {
                        min: 0,
                        max: 1.5,
                        value: this.state.delay.feedback
                    }
                })
            ),
            e('div', { className: 'device__keyboard' },
                e('div', { className: 'device__keyboard-content' },
                    e(Ribbon)
                )
            )
        );
    }
}
