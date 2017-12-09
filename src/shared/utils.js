/* eslint-disable
    no-param-reassign,
    no-plusplus
*/

// http://gizma.com/easing/#cub1

export const easeLinear = (t, b, c, d) => c * t / d + b;

/**
 * @param  {Number} t current time
 * @param  {Number} b start value
 * @param  {Number} c change in value
 * @param  {Number} d duration
 * @return {Number} current value
 */
export const easeInQuad = (t, b, c, d) => {
    t /= d;
    return c * t * t + b;
};

export const easeOutQuad = (t, b, c, d) => {
    t /= d;
    return -c * t * (t - 2) + b;
};

export const easeInCubic = (t, b, c, d) => {
    t /= d;
    return c * t * t * t + b;
};

export const easeOutCubic = (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
};
