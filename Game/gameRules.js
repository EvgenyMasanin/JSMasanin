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
        chance: 10,
        coinChance: 20,

        bonusRadius: 10,

        platformMaxWidth : 200,
        platformMinWidth : 40,
        
        platformResizeValue : 20,
        platformIncreaseProbability : 13,
        platformDecreaseProbability : 15,
        
        platformIncreaseValue : -50,
        platformDecreaseValue : 100,
        
        platformIncreaseImageSRC: './images/bonus_platform_increase.png',
        platformDecreaseImageSRC: './images/bonus_platform_decrease.png',
        

        ballMaxSide: 20,
        ballMinSide: 5,
        ballResizeValue: 5, 

        ballIncreaseProbability: 13,
        ballDecreaseProbability: 15,
        
        ballIncreaseValue: -50,
        ballDecreaseValue: 100,

        ballIncreaseImageSRC: './images/bonus_ball_increase.png',
        ballDecreaseImageSRC: './images/bonus_ball_decrease.png',


        barierProbability: 12,
        barierValue: -150,
        barierDuration: 10000,
        barierImageSRC: './images/bonus_barier.png',

        coinProbability: 42,
        coinValue: 300,
        coinImageSRC: './images/bonus_coin.png',
    }
}