/**
 * Two-dimensional point
 * @typedef {[number, number]} Point
 */

/**
 * Length
 * @typedef {number} Length
 */

/**
 * A floating point number, where 1 represents 2pi radians
 * @typedef {number} Angle
 */

/**
 * Zero angle vector
 * @var {Point}
 */
export const BASIS = [1, 0];

/**
 * Get vectors scalar product
 * @param {Point}
 * @param {Point}
 * @returns {Length}
 */
export const getScalarProduct = ([ax, ay], [bx, by]) => ax * bx + ay * by;

/**
 * Get vector magnitude
 * @param {Point}
 * @returns {Length}
 */
export const getMagnitude = ([x, y]) => Math.sqrt(x * x + y * y);

/**
 * @param {Point} a
 * @param {Point} b
 * @returns {boolean}
 */
export const equal = ([ax, ay], [bx, by]) => ax === bx && ay === by;

/**
 * @param {Point} a
 * @param {Point} b
 * @returns {Point}
 */
export const subtract = ([ax, ay], [bx, by]) => [ax - bx, ay - by];

/**
 * @param {Point}
 * @returns {Length}
 */
export const getAngle = ([x, y]) => {
    if (x === 1 && y === 0) {
        return 0;
    }

    const angle = Math.acos(x / Math.sqrt(x * x + y * y));
    return y < 0 ? -angle : angle;
};
