import { Component } from 'react';
import { connect } from 'react-redux';

import addAudioNodeHook from '../webaudio/audio-node-hook';
import Monotron from '../webaudio/monotron';


const mapUnitToValue = (min, max, value) => min + value * (max - min);

class Audio extends Component {
    constructor() {
        super();
        addAudioNodeHook();
        this.monotron = new Monotron(new AudioContext());
    }

    render() {
        this.monotron.lfo.frequency.value = mapUnitToValue(1, 50, this.props.lfo.frequency);
        this.monotron.lfo.gain.value = mapUnitToValue(0, 10, this.props.lfo.intensity);
        this.monotron.lfo.type = this.props.lfo.shape;

        this.monotron.osc.gain.value = this.props.osc.gain;
        this.monotron.osc.frequency.value = this.props.osc.frequency;

        this.monotron.vcf.frequency.value = mapUnitToValue(20, 20000, this.props.vcf.cutoff);

        this.monotron.delay.delayTime.value = mapUnitToValue(.05, 2, this.props.delay.time);
        this.monotron.delay.feedback.value = mapUnitToValue(0, 1.5, this.props.delay.feedback);

        this.monotron.output.gain.value = this.props.power ? this.props.volume : 0;

        return null;
    }
}

export default connect((state) => ({ ...state }))(Audio);
