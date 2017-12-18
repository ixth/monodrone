import { draggable } from './draggable.js';

export class Param {
    constructor(element) {
        const input = element.querySelector('.param__input');
        const rotary = element.querySelector('.param__rotary');

        const angle = 280;

        const min = parseInt(input.getAttribute('min'), 10);
        const max = parseInt(input.getAttribute('max'), 10);
        const range = max - min;

        const setPostion = value => {
            const p = (value - min) / range;
            rotary.style.transform = `rotate(${(p - .5) * angle}deg)`;
        };

        setPostion(input.value);

        draggable(rotary);
        let initialValue;
        rotary.addEventListener('dragStart', _ => {
            document.body.style.cursor = '-webkit-grabbing';
            document.body.style.userSelect = 'none';
            initialValue = parseInt(input.value, 10);
        });

        rotary.addEventListener('drag', function (e) {
            const p = Math.min(Math.max(e.detail.delta, -256), 256) / 256;
            input.value = initialValue + range * p;
            input.dispatchEvent(new Event('input'));
        });

        rotary.addEventListener('dragEnd', _ => {
            document.body.style.cursor = '';
        });

        input.addEventListener('input', function () {
            setPostion(this.value);
        });

        Object.assign(this, {
            element,
            input,
            rotary
        });
    }
}
