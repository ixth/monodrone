import Audio from 'components/Audio';
import Midi from 'components/Midi';
import Block from 'components/Block';
import Mode from 'components/Mode';
import LfoRate from 'components/LfoRate';
import LfoInt from 'components/LfoInt';
import VcfCutoff from 'components/VcfCutoff';
import DelayTime from 'components/DelayTime';
import DelayFeedback from 'components/DelayFeedback';
import Ribbon from 'components/Ribbon';


const Monotron = () => (
    <div className="device">
        <div className="device__blocks">
            <Audio />
            <Midi />
            <Mode />
            <Block title="LFO">
                <LfoRate />
                <LfoInt />
            </Block>
            <Block title="VCF">
                <VcfCutoff />
            </Block>
            <Block title="Delay">
                <DelayTime />
                <DelayFeedback />
            </Block>
        </div>
        <div className="device__keyboard">
            <div className="device__keyboard-content">
                <Ribbon />
            </div>
        </div>
    </div>
);

export default Monotron;
