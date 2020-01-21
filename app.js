'use strict';


/*global MicroCanvas */
const game = new MicroCanvas();


let gfxGotchi, gfxGotchiFlip, gfxPizza, gfxGotchiEat, gfxGotchiDead;


let x = 0, y = 0;
let sx = 1, sy = 1;


let pizzay = 0;
let pizzafallspeed = 0;

let hungry = 0;

let animationSpeed = 8;



game.setup(() => {
    gfxGotchi = game.loadSprite(`! gotchi 16x16@#ffe727,#ffffff
................
................
................
................
................
................
..........#.....
..........##....
..........###...
.##....####222#.
.##....####2.2#.
.###..#####222#.
.##############.
.##############.
................
................`);
    gfxGotchiFlip = game.loadSprite(`! gotchiFlip 16x16@#ffe727,#ffffff
................
................
................
................
................
................
.....#..........
....##..........
...####.........
.########....##.
.#222####....##.
.#2.2#####..###.
.#222##########.
.##############.
................
................`);
    gfxGotchiEat = game.loadSprite(`! gotchiEat 16x16@#ffe727,#454545
................
.....######.....
...##########...
...##########...
...2222222222#..
...#222###222#..
...#222#2#222#..
...#####2#####..
...####22#####..
...#2#######2#..
...##2222222##..
...###22222###..
....#########...
......#####.....
................
................`);

    gfxGotchiDead = game.loadSprite(`! gotchiDead 16x16@#ffe727,#454545
................
.....######.....
...##########...
...##########...
...##22###22##..
...##2####2###..
...#####2#####..
...#####2#####..
...####22#####..
...###########..
...###22222###..
...##2222222##..
....#########...
......#####.....
................
................`);

    gfxPizza = game.loadSprite(`! pizza 10x10@#ffa300,#ff004d,#ffe727
..........
.########.
.23232332.
..232323..
..332323..
...2322...
...3233...
....23....
....32....
..........`);

    y = game.height - gfxGotchi.height;
});



game.loop(() => {
    if (game.everyXFrames(10)) {
        hungry = hungry + 1;
    }

    if (hungry < 100) {
        x = x + sx;
    }

    if (pizzafallspeed > 0) {
        pizzay = pizzay + pizzafallspeed;
    }

    if (x > game.width - gfxGotchi.width) {
        x = game.width - gfxGotchi.width;
        sx = -1;
    }

    if (x < 0) {
        x = 0;
        sx = 1;
    }

    if (game.detectCollision(gfxGotchi, x, y, gfxPizza, 50, pizzay)) {
        hungry = hungry - 20;

        pizzay = 0;
        pizzafallspeed = 0;
    }

    // Clear display, redraw background text
    game.clear();

    game.centerText(`${hungry}`, 20, 10);

    // Draw gotchi
    if (hungry < 5) {
        game.drawImage(gfxGotchiEat, x, y);
    } else if (hungry > 100) {
        game.drawImage(gfxGotchiDead, x, y);
    } else {
        if (sx === 1) {
            game.drawImage(gfxGotchi, x, y);
        } else {
            game.drawImage(gfxGotchiFlip, x, y);
        }
    }


    game.drawImage(gfxPizza, 50, pizzay);

    if (game.buttonPressed('enter')) {
        pizzafallspeed = 2;
    }
    if (game.everyXFrames(120)) {
        if (pizzay > game.height) {
            pizzay = 0;
            pizzafallspeed = 0;
        }
    }
    // Screen updates automatically at the end of loop()
});


console.log("MicroCanvas initialized");
