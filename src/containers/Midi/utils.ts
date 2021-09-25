export const frequencyFromNote = (tone: number): number => 440 * 2 ** ((tone - 69) / 12);
