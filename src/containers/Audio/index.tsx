import { VFC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'rootReducer';

import Audio from 'components/Audio';

const AudioContainer: VFC = () => {
    const { delay, lfo, osc, power, vcf, volume } = useSelector((state: RootState) => state);
    return <Audio delay={delay} lfo={lfo} osc={osc} power={power} vcf={vcf} volume={volume} />;
};

export default AudioContainer;
