export const mapUnitToValue = (min: number, max: number, value: number): number =>
    min + value * (max - min);

export const resumeContextOnInteraction = (audioContext: AudioContext): Promise<void> =>
    new Promise((resolve, reject) => {
        document.addEventListener('click', function cb() {
            if (audioContext.state === 'suspended') {
                document.removeEventListener('click', cb);
                audioContext.resume().then(resolve, reject);
            }
        });
    });
