'use strict'

import { game } from './game.js'
  

const moveLeftButtonCode = 'ArrowLeft',
    moveRightButtonCode = 'ArrowRight',
    startButtonCode = 'Space';

game.addEventMove(moveLeftButtonCode, moveRightButtonCode, startButtonCode)

requestAnimationFrame(game.mainLoop.bind(game));