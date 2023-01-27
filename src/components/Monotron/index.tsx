import { VFC } from 'react';

import Block from 'components/Block';
import Knob from 'components/Knob/controlled';
import Mode from 'components/Mode';
import Param from 'components/Param';
import AudioContainer from 'containers/Audio';
import MidiContainer from 'containers/Midi';
import RibbonContainer from 'containers/Ribbon';

import './styles/device.css';
import Fieldset, { Control } from 'components/Fieldset';
import Legend from 'components/Legend';
import Label from 'components/Label';

interface PropTypes {
    mode: 'sawtooth' | 'square' | 'standby';
    onModeChange: (value: 'sawtooth' | 'square' | 'standby') => void;
    frequency: number;
    onFrequencyChange: (e: { value: number }) => void;
    intensity: number;
    onIntensityChange: (e: { value: number }) => void;
    cutoff: number;
    onCutoffChange: (e: { value: number }) => void;
    delayTime: number;
    onDelayTimeChange: (e: { value: number }) => void;
    feedback: number;
    onFeedbackChange: (e: { value: number }) => void;
}

const Monotron: VFC<PropTypes> = ({
    mode,
    onModeChange,
    frequency,
    onFrequencyChange,
    intensity,
    onIntensityChange,
    cutoff,
    onCutoffChange,
    delayTime,
    onDelayTimeChange,
    feedback,
    onFeedbackChange,
}) => (
    <>
        <AudioContainer />
        <MidiContainer />
        <div className="device">
            <div className="device__controls">
                <div className="device__mode">
                    <Mode value={mode} onChange={onModeChange} />
                </div>
                <div className="device__block">
                    <Fieldset>
                        <Legend wide>LFO</Legend>
                        <Control>
                            <Knob value={frequency} onChange={onFrequencyChange} led />
                            <Label wide>Rate</Label>
                        </Control>
                        <Control>
                            <Knob value={intensity} onChange={onIntensityChange} />
                            <Label wide>Int</Label>
                        </Control>
                    </Fieldset>
                </div>
                <div className="device__block">
                    <Fieldset>
                        <Legend wide>VCF</Legend>
                        <Control>
                            <Knob value={cutoff} onChange={onCutoffChange} />
                            <Label wide>Cutoff</Label>
                        </Control>
                    </Fieldset>
                </div>
                <div className="device__block">
                    <Fieldset>
                        <Legend wide>Delay</Legend>
                        <Control>
                            <Knob value={delayTime} onChange={onDelayTimeChange} />
                            <Label wide>Time</Label>
                        </Control>
                        <Control>
                            <Knob value={feedback} onChange={onFeedbackChange} />
                            <Label wide>Feedback</Label>
                        </Control>
                    </Fieldset>
                </div>
            </div>
            <div className="device__keyboard">
                <div className="device__keyboard-content">
                    <RibbonContainer />
                </div>
            </div>
        </div>
    </>
);

export default Monotron;
