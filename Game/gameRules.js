// import { field, canvas, context } from './field.js';

let canvasWidth = 400;
let fieldBrickWidth = 45
let fieldWallSize = 12

export const gameRules = {
    canvas: {
        width: 400,
        height: 500,
        backgroundImageSRC: './images/background.png',
    },

    field: {
        wallSize: 12,
        verticalWallImageSRC: './images/verticalWall.png',
        horizontalWallImageSRC: './images/horizontalWall.png',
        margin: 2,
        height: 16,
        width: 45,
        colorMap: {
            R: './images/brick_red.png',
            O: './images/brick_orange.png',
            B: './images/brick_blue.png',
            R1: './images/brick_red_strong.png',
            O1: './images/brick_orange_strong.png',
            B1: './images/brick_blue_strong.png',
            R11: './images/brick_red_durable.png',
            O11: './images/brick_orange_durable.png',
            B11: './images/brick_blue_durable.png',
            U: './images/brick_unbreakable.png'
        },
    },

    status: {
        level: 0,
        health: 3,
        player: 'Inexorable',
        score: 0
    },

    platform: {
        x: (canvasWidth / 2 - fieldBrickWidth / 2),
        y: 440,
        width: 80,
        height: 16,
        speed: 7,
        imageSRC: './images/platform.png'
    },

    barier: {
        x: fieldWallSize,
        y: 460,
        width: 376,
        height: 12,
        speed: 0,
        imageSRC: './images/barier.png'
    },

    ball: {
        x: 0, 
        y: 0, 
        side: 9, 
        speed: 2.5
    },

    brickValue: 100,

    bonus: {
        chance: 8,
        coinChance: 20,

        bonusRadius: 10,

        
        platformMaxWidth : 200,
        platformMinWidth : 40,
        
        platformResizeValue : 10,
        platformIncreaseProbability : 13,
        platformDecreaseProbability : 15,
        
        platformIncreaseValue : -50,
        platformDecreaseValue : 50,
        
        platformIncreaseImageSRC: './images/bonus_platform_increase.png',
        platformDecreaseImageSRC: './images/bonus_platform_decrease.png',
        

        ballMaxSide: 20,
        ballMinSide: 5,
        ballResizeValue: 12, 

        ballIncreaseProbability: 13,
        ballDecreaseProbability: 15,
        
        ballIncreaseValue: -50,
        ballDecreaseValue: 50,

        ballIncreaseImageSRC: './images/bonus_ball_increase.png',
        ballDecreaseImageSRC: './images/bonus_ball_decrease.png',


        barierProbability: 12,
        barierValue: -100,
        barierDuration: 10000,
        barierImageSRC: './images/bonus_barier.png',

        coinProbability: 42,
        coinValue: 200,
        coinImageSRC: './images/bonus_coin.png',
    }
}