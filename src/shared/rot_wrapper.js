/* eslint-disable
    no-underscore-dangle,
    class-methods-use-this,
    no-unused-vars,
    one-var,
    default-case,
    prefer-destructuring,
    no-continue
*/

const ROT = {
    /** Directional constants. Ordering is important! */
    DIRS: {
        '4': [[0, -1], [1, 0], [0, 1], [-1, 0]],
        '8': [
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
        ],
        '6': [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1], [-2, 0]],
    },
};

/**
 * @class Abstract FOV algorithm
 * @param {function} lightPassesCallback Does the light pass through x,y?
 * @param {object} [options]
 * @param {int} [options.topology=8] 4/6/8
 */
ROT.FOV = class FOV {
    constructor(lightPassesCallback, options) {
        this._lightPasses = lightPassesCallback;
        this._options = {
            topology: 8,
        };

        Object.keys(options || {}).forEach(p => {
            this._options[p] = options[p];
        });
    }

    /**
     * Compute visibility for a 360-degree circle
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */
    compute(x, y, R, callback) {}

    /**
     * Return all neighbors in a concentric ring
     * @param {int} cx center-x
     * @param {int} cy center-y
     * @param {int} r range
     */
    _getCircle(cx, cy, r) {
        const result = [];
        let dirs, countFactor, startOffset;

        switch (this._options.topology) {
            case 4:
                countFactor = 1;
                startOffset = [0, 1];
                dirs = [
                    ROT.DIRS[8][7],
                    ROT.DIRS[8][1],
                    ROT.DIRS[8][3],
                    ROT.DIRS[8][5],
                ];
                break;

            case 6:
                dirs = ROT.DIRS[6];
                countFactor = 1;
                startOffset = [-1, 1];
                break;

            case 8:
                dirs = ROT.DIRS[4];
                countFactor = 2;
                startOffset = [-1, 1];
                break;
        }

        /* starting neighbor */
        let x = cx + startOffset[0] * r;
        let y = cy + startOffset[1] * r;

        /* circle */
        for (let i = 0; i < dirs.length; i++) {
            for (let j = 0; j < r * countFactor; j++) {
                result.push([x, y]);
                x += dirs[i][0];
                y += dirs[i][1];
            }
        }

        return result;
    }
};

/** Octants used for translating recursive shadowcasting offsets */
const OCTANTS = [
    [-1, 0, 0, 1],
    [0, -1, 1, 0],
    [0, -1, -1, 0],
    [-1, 0, 0, -1],
    [1, 0, 0, -1],
    [0, 1, -1, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
];

/**
 * @class Recursive shadowcasting algorithm
 * Currently only supports 4/8 topologies, not hexagonal.
 * Based on Peter Harkins' implementation of Björn Bergström's algorithm described here: http://www.roguebasin.com/index.php?title=FOV_using_recursive_shadowcasting
 * @augments ROT.FOV
 */
ROT.FOV.RecursiveShadowcasting = class RecursiveShadowcasting extends ROT.FOV {
    /**
     * Compute visibility for a 360-degree circle
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */
    compute(x, y, R, callback) {
        // You can always see your own tile
        callback(x, y, 0, 1);
        for (let i = 0; i < OCTANTS.length; i++) {
            this._renderOctant(x, y, OCTANTS[i], R, callback);
        }
    }

    /**
     * Compute visibility for a 180-degree arc
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
     * @param {function} callback
     */
    compute180(x, y, R, dir, callback) {
        // You can always see your own tile
        callback(x, y, 0, 1);
        const previousOctant = (dir - 1 + 8) % 8; // Need to retrieve the previous octant to render a full 180 degrees
        const nextPreviousOctant = (dir - 2 + 8) % 8; // Need to retrieve the previous two octants to render a full 180 degrees
        const nextOctant = (dir + 1 + 8) % 8; // Need to grab to next octant to render a full 180 degrees
        this._renderOctant(x, y, OCTANTS[nextPreviousOctant], R, callback);
        this._renderOctant(x, y, OCTANTS[previousOctant], R, callback);
        this._renderOctant(x, y, OCTANTS[dir], R, callback);
        this._renderOctant(x, y, OCTANTS[nextOctant], R, callback);
    }

    /**
     * Compute visibility for a 90-degree arc
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
     * @param {function} callback
     */
    compute90(x, y, R, dir, callback) {
        // You can always see your own tile
        callback(x, y, 0, 1);
        const previousOctant = (dir - 1 + 8) % 8; // Need to retrieve the previous octant to render a full 90 degrees
        this._renderOctant(x, y, OCTANTS[dir], R, callback);
        this._renderOctant(x, y, OCTANTS[previousOctant], R, callback);
    }

    /**
     * Render one octant (45-degree arc) of the viewshed
     * @param {int} x
     * @param {int} y
     * @param {int} octant Octant to be rendered
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */
    _renderOctant(x, y, octant, R, callback) {
        // Radius incremented by 1 to provide same coverage area as other shadowcasting radiuses
        this._castVisibility(
            x,
            y,
            1,
            1.0,
            0.0,
            R + 1,
            octant[0],
            octant[1],
            octant[2],
            octant[3],
            callback,
        );
    }

    /**
     * Actually calculates the visibility
     * @param {int} startX The starting X coordinate
     * @param {int} startY The starting Y coordinate
     * @param {int} row The row to render
     * @param {float} visSlopeStart The slope to start at
     * @param {float} visSlopeEnd The slope to end at
     * @param {int} radius The radius to reach out to
     * @param {int} xx
     * @param {int} xy
     * @param {int} yx
     * @param {int} yy
     * @param {function} callback The callback to use when we hit a block that is visible
     */
    _castVisibility(
        startX,
        startY,
        row,
        visSlopeStart,
        visSlopeEnd,
        radius,
        xx,
        xy,
        yx,
        yy,
        callback,
    ) {
        if (visSlopeStart < visSlopeEnd) {
            return;
        }
        for (let i = row; i <= radius; i++) {
            let dx = -i - 1;
            const dy = -i;
            let blocked = false;
            let newStart = 0;

            // 'Row' could be column, names here assume octant 0 and would be flipped for half the octants
            while (dx <= 0) {
                dx += 1;

                // Translate from relative coordinates to map coordinates
                const mapX = startX + dx * xx + dy * xy;
                const mapY = startY + dx * yx + dy * yy;

                // Range of the row
                const slopeStart = (dx - 0.5) / (dy + 0.5);
                const slopeEnd = (dx + 0.5) / (dy - 0.5);

                // Ignore if not yet at left edge of Octant
                if (slopeEnd > visSlopeStart) {
                    continue;
                }

                // Done if past right edge
                if (slopeStart < visSlopeEnd) {
                    break;
                }

                // If it's in range, it's visible
                if (dx * dx + dy * dy < radius * radius) {
                    callback(mapX, mapY, i, 1);
                }

                if (!blocked) {
                    // If tile is a blocking tile, cast around it
                    if (!this._lightPasses(mapX, mapY) && i < radius) {
                        blocked = true;
                        this._castVisibility(
                            startX,
                            startY,
                            i + 1,
                            visSlopeStart,
                            slopeStart,
                            radius,
                            xx,
                            xy,
                            yx,
                            yy,
                            callback,
                        );
                        newStart = slopeEnd;
                    }
                } else {
                    // Keep narrowing if scanning across a block
                    if (!this._lightPasses(mapX, mapY)) {
                        newStart = slopeEnd;
                        continue;
                    }

                    // Block has ended
                    blocked = false;
                    visSlopeStart = newStart;
                }
            }
            if (blocked) {
                break;
            }
        }
    }
};

export const FOV = ROT.FOV;

export default ROT;
