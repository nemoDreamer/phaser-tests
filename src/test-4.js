import ROT from 'rot-js';

const w = 32;
const h = 24;

const maps = [
    // new ROT.Map.Arena(w, h),
    [
        'dungeon',
        new ROT.Map.Digger(w, h, {
            corridorLength: [1, 20],
            dugPercentage: 0.2,
        }),
    ],
    [
        'dungeon',
        new ROT.Map.Digger(w, h, {
            corridorLength: [1, 10],
            dugPercentage: 0.5,
        }),
    ],
    ['cellular', new ROT.Map.Cellular(w, h)],
    ['cellular', new ROT.Map.Cellular(w, h), 0.66, 4],
    [
        'cellular',
        new ROT.Map.Cellular(w, h, {
            born: [3, 4, 5], // default: [5, 6, 7, 8]
            survive: [4, 5, 6], // default: [4, 5, 6, 7, 8]
            // topology: 8, // default: 8
        }),
        0.5,
        1,
    ],
    [
        'cellular',
        new ROT.Map.Cellular(w, h, {
            born: [5, 6, 7],
            survive: [5, 6, 7, 8],
        }),
        0.75,
        2,
    ],
    ['maze', new ROT.Map.DividedMaze(w, h)],
    ['maze', new ROT.Map.IceyMaze(w, h)],
    ['maze', new ROT.Map.IceyMaze(w, h, 2)],
    ['maze', new ROT.Map.IceyMaze(w, h, 10)],
    ['maze', new ROT.Map.EllerMaze(w, h)],
];

const displayOptions = { width: w, height: h, fontSize: 8 };

maps.forEach(config => {
    const display = new ROT.Display(displayOptions);

    const canvas = display.getContainer();
    canvas.style.padding = '10px';
    document.body.appendChild(canvas);

    const type = config[0];
    const map = config[1];

    if (type === 'cellular') {
        map.randomize(config[2] || 0.5);

        for (let i = 0; i < (config[3] || 4); i++) {
            // evolve some generations
            map.create();
        }

        map.connect(display.DEBUG);
    } else {
        map.create(display.DEBUG);
    }

    if (type === 'dungeon') {
        map.getRooms().forEach(room => {
            room.getDoors((x, y) => {
                display.draw(x, y, '', '', 'red');
            });
        });
    }
});

// ==================================================

const output = Array(h)
    .fill(undefined)
    .map(() => Array(w).fill(undefined));

new ROT.Map.Digger(32, 24, {
    corridorLength: [1, 10],
    dugPercentage: 0.5,
})
    .create((x, y, wall) => {
        // NOTE: first `y`, then `x`, since the outer Array is the _rows_!
        output[y][x] = wall ? 11 : 1;
    })
    .getRooms()
    .forEach(room => {
        room.getDoors((x, y) => {
            output[y][x] = 21;
        });
    });

// for Tiled CSV data:
// eslint-disable-next-line no-console
console.log([].concat(...output).join());
