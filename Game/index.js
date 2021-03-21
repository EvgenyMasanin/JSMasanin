'use strict'

import { game } from './game.js'

export const brick = {
    margin: 2,
    height: 12,
    width: 25,
};

// export const platform = {
//     x: canvas.width / 2 - brick.width / 2,
//     y: 440,
//     width: 100,
//     height: 12,
//     speed: 5,
//     dx: 0
// };

const moveLeftButtonCode = 'ArrowLeft',
    moveRightButtonCode = 'ArrowRight',
    startButtonCode = 'Space';
  
game.addEventMove(moveLeftButtonCode, moveRightButtonCode, startButtonCode)

requestAnimationFrame(game.mainLoop.bind(game));