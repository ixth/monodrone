import { Audio } from './audio.js';
import { Mode } from './blocks/mode.js';
import { Lfo } from './blocks/lfo.js';
import { Vcf } from './blocks/vcf.js';
import { Delay } from './blocks/delay.js';
import { Ribbon } from './blocks/ribbon.js';
import React from '../lib/React.js';

const e = React.createElement;

export function Monotron() {
    return e('div', { className: 'device' },
        e(Audio),
        e('div', { className: 'device__blocks' },
            e(Mode),
            e(Lfo),
            e(Vcf),
            e(Delay)
        ),
        e('div', { className: 'device__keyboard' },
            e('div', { className: 'device__keyboard-content' },
                e(Ribbon)
            )
        )
    );
}
