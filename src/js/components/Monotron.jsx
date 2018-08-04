import Audio from './Audio';
import Block from './Block';
import Mode from './Mode';
import LfoRate from './LfoRate';
import LfoInt from './LfoInt';
import VcfCutoff from './VcfCutoff';
import DelayTime from './DelayTime';
import DelayFeedback from './DelayFeedback';
import Ribbon from './Ribbon';


const Monotron = () => (
    <div className="device">
        <div className="device__blocks">
            <Audio />
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
