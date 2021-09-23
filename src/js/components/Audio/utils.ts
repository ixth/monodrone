export const mapUnitToValue =
    (min: number, max: number, value: number): number =>
        min + value * (max - min);
