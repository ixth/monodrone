import { Audio } from './audio';
import { Mode } from './blocks/mode';
import { Lfo } from './blocks/lfo';
import { Vcf } from './blocks/vcf';
import { Delay } from './blocks/delay';
import { Ribbon } from './blocks/ribbon';

import { store } from '../store';

import { Component } from 'react';

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
        return (
            <div className='device'>
                <Audio />
                <div className='device__blocks'>
                    <Mode value={store.standby ? 'standby' : store.lfo.shape} />
                    <Lfo
                        frequency={({
                            min: 1,
                            max: 50,
                            value: this.state.lfo.frequency
                        })}
                        intensity={({
                            min: 0,
                            max: 10,
                            value: this.state.lfo.intensity,
                        })}
                    />
                    <Vcf
                        cutoff={({
                            min: 20,
                            max: 20000,
                            value: this.state.vcf.cutoff
                        })}
                    />
                    <Delay
                        time={({
                            min: .05,
                            max: 2,
                            value: this.state.delay.time
                        })}
                        feedback={({
                            min: 0,
                            max: 1.5,
                            value: this.state.delay.feedback
                        })}
                    />
                </div>
                <div className='device__keyboard'>
                    <div className='device__keyboard-content'>
                        <Ribbon />
                    </div>
                </div>
            </div>
        );
    }
}
