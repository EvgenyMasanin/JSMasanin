'use strict'

import { a } from './test.js'

alert(a);

const loseScrin = document.querySelector('.lose-scrin');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let level;
let bricks; 
const colorMap = {
    R: 'red',
    O: 'orange',
    G: 'green',
    Y: 'yellow',
    Rst: 'red',
    Ost: 'orange',
    Gst: 'green',
    Yst: 'yellow',
    Rdur: 'red',
    Odur: 'orange',
    Gdur: 'green',
    Ydur: 'yellow',
    H: 'gray' //hindrance - помеха
}

const brick = {
    margin: 2,
    height: 12,
    width: 25,
};

const wallSize = 12;

const platform = {
    x: canvas.width / 2 - brick.width / 2,
    y: 440,
    width: 100,
    height: 12,
    speed: 5,
    dx: 0
};

const ball = {
    x: 330,
    y: 260,
    width: 5,
    height: 5,
    speed: 2.5,
    dx: 0,
    dy: 0
};

const moveLeftButtonCode = 'ArrowLeft',
    moveRightButtonCode = 'ArrowRight',
    startButtonCode = 'Space';

restart();
    
addEventMove();

function addEventMove(){
    document.addEventListener('keydown', e => {
        if (e.code === moveLeftButtonCode) {
            platform.dx = -platform.speed;
        }
        else if (e.code === moveRightButtonCode) {
            platform.dx = platform.speed;
        }

        if (ball.dx === 0 && ball.dy === 0 && e.code === startButtonCode) {
            ball.dx = ball.speed;
            ball.dy = ball.speed;
        }
    });
    document.addEventListener('keyup', e => {
        if (e.code == moveLeftButtonCode || e.code == moveRightButtonCode) {
            platform.dx = 0;
        }
    })
};

function restart() {
    level = [
        [],
        [],
        [],
        [],
        [],
        ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H',],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
        ['O', 'O', 'H', 'H', 'O', 'O', 'H', 'H', 'O', 'O'],
        ['O', 'O', 'H', 'H', 'O', 'O', 'H', 'H', 'O', 'O'],
        ['G', 'G', 'Gst', 'Gst', 'G', 'Gdur', 'Gdur', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
        ['Gst', 'Gst', 'Gst', 'Gst', 'Gst', 'Gst', 'Gst', 'Gst', 'Gst', 'Gst', 'Gst', 'Gst', 'Gst', 'Gst',],
        ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R']
    ];

    setBricks();

    platform.x = canvas.width / 2 - platform.width / 2;
    platform.y = 440;

    function setBricks() {
        bricks = [];
        for (let i = 0; i < level.length; i++) {
            for (let j = 0; j < level[i].length; j++) {
                const colorCode = level[i][j];
                let strangth;
                if (level[i][j] != '') {
                    strangth = 1;
                }
                if (level[i][j].endsWith('st')) {
                    strangth = 2;
                }
                else if (level[i][j].endsWith('dur')) {
                    strangth = 3;
                }
                else if (level[i][j] == 'H') {
                    strangth = 4;
                }
                if (level[i][j] != '') {
                    bricks.push({
                        x: wallSize + (brick.width + brick.margin) * j,
                        y: wallSize + (brick.height + brick.margin) * i,
                        color: colorMap[colorCode],
                        width: brick.width,
                        height: brick.height,
                        strangth: strangth
                    });
                }
                else {
                    bricks.push({});
                }
            }
        }
    }
};


function mainLoop(){
    requestAnimationFrame(mainLoop);
    context.clearRect(0, 0, canvas.width, canvas.height);

    movePlatform();

    movaBall();

    platformCollide();
    
    brickCollide();

    drawWalls();

    drawBall();
    
    drawField();

    drawPlatform();

    function movaBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x < wallSize) {
            ball.x = wallSize;
            ball.dx *= -1;
        }
        else if (ball.x + ball.width > canvas.width - wallSize) {
            ball.x = canvas.width - wallSize - ball.width;
            ball.dx *= -1;
        }
        if (ball.y < wallSize) {
            ball.y = wallSize;
            ball.dy *= -1;
        }

        isLose();

        function isLose() {
            if (ball.y > canvas.height) {
                loseScrin.classList.add('visible');
                ball.x = 130;
                ball.y = 260;
                ball.dx = 0;
                ball.dy = 0;

                document.addEventListener('keydown', function listener() {
                    loseScrin.classList.remove('visible');
                    loseScrin.classList.add('hedden');
                    restart();
                    document.removeEventListener('keydown', listener);

                });
            }
        }
    }

    function movePlatform() {
        platform.x += platform.dx;

        if (platform.x < wallSize) {
            platform.x = wallSize;
        }
        else if (platform.x + platform.width > canvas.width - wallSize) {
            platform.x = canvas.width - wallSize - platform.width;
        }
    }

    function drawWalls() {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, canvas.width, wallSize);
        context.fillRect(0, 0, wallSize, canvas.height);
        context.fillRect(canvas.width - wallSize, 0, wallSize, canvas.height);
    }

    function drawBall(){
        if(ball.dx || ball.dy) {
            context.fillRect(ball.x, ball.y, ball.width, ball.height);
        }
    }

    function drawField(){
        bricks.forEach(brick => {
            if(brick.strangth == 2) {
                context.fillStyle = 'gray';
                context.fillRect(brick.x, brick.y, brick.width, brick.height);

                context.fillStyle = brick.color;
                context.fillRect(brick.x + 2, brick.y + 2, brick.width - 4, brick.height - 4);
            }
            else if(brick.strangth == 3) {
                context.fillStyle = 'gray';
                context.fillRect(brick.x, brick.y, brick.width, brick.height);

                context.fillStyle = brick.color;
                context.fillRect(brick.x + 4, brick.y + 4, brick.width - 8, brick.height - 8);
            }
            else if(brick.strangth == 4 || brick.strangth == 1) {
                context.fillStyle = brick.color;
                context.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });
    };

    function drawPlatform(){
        context.fillStyle = 'cyan';
        context.fillRect(platform.x, platform.y, platform.width, platform.height);
    }

    function myIsCollide(ball, obj) {
        return obj.x + obj.width - 1 >= ball.x &&
            ball.x + ball.width >= obj.x &&
            obj.y + obj.height + ball.height >= ball.y + ball.height &&
            ball.y + ball.height >= obj.y
    }

    function brickCollide() {
        for (let i = 0; i < bricks.length; i++) {
            if (bricks[i] == {})
                continue;
            const currentBrick = bricks[i];
            if (myIsCollide(ball, currentBrick)) {
                if (currentBrick.strangth == 1) {
                    bricks.splice(i, 1);
                }
                else if (currentBrick.strangth > 1 && currentBrick.strangth < 4) {
                    currentBrick.strangth--;
                }
                if (ball.x + ball.width > currentBrick.x &&
                    ball.x < currentBrick.x + currentBrick.width &&
                    ball.y + ball.height <= currentBrick.y + brick.margin) {
                    ball.dy *= -1;
                    ball.y = currentBrick.y - ball.height - 2;
                }
                else if (ball.x + ball.width > currentBrick.x &&
                    ball.x < currentBrick.x + currentBrick.width &&
                    ball.y >= currentBrick.y + currentBrick.height - brick.margin) {
                    ball.dy *= -1;
                    ball.y = currentBrick.y + currentBrick.height + ball.height + 2;
                }
                else if (ball.x <= currentBrick.x + currentBrick.width / 2 &&
                    ball.y + ball.height >= currentBrick.y &&
                    ball.y <= currentBrick.y + currentBrick.height) {
                    ball.dx *= -1;
                    ball.x = currentBrick.x - ball.width - 2
                }
                else if (ball.x > currentBrick.x + currentBrick.width / 2 &&
                    ball.y + ball.height >= currentBrick.y &&
                    ball.y <= currentBrick.y + currentBrick.height) {
                    ball.dx *= -1;
                    ball.x = currentBrick.x + currentBrick.width + ball.width + 2
                }
                //временный дебагер
                else {
                    alert(`?
                    ball.x = ${ball.x}
                    ball.y = ${ball.y}
                    ball.width = ${ball.width}
                    ball.heght = ${ball.height}
                    currentBrick.x = ${currentBrick.x}
                    currentBrick.y = ${currentBrick.y}
                    currentBrick.width = ${currentBrick.width}
                    currentBrick.heght = ${currentBrick.height}
                    `)
                }
                break;
            }
        }
    }

    function platformCollide() {
        let leftSide = Object.create(platform),
            rightSide = Object.create(platform),
            centralSide = Object.create(platform);

        leftSide.width = rightSide.width = centralSide.width = platform.width / 3;
        centralSide.x = platform.x + platform.width / 3;
        rightSide.x = platform.x + 2 * (platform.width / 3);

        let wasCollide = false;
        if (myIsCollide(ball, leftSide)) {
            wasCollide = true;
            if (ball.dx > 0) {
                ball.dx = ball.speed;
                ball.dx *= -1;
            }
            else
                ball.dx = ball.speed * -1;
        }
        else if (myIsCollide(ball, rightSide)) {
            wasCollide = true;
            if (ball.dx < 0) {
                ball.dx = ball.speed * -1
                ball.dx *= -1;
            }
            else
                ball.dx = ball.speed
        }
        else if (myIsCollide(ball, centralSide)) {
            ball.dy = ball.speed + 1;
            ball.dx = ball.speed - 2;
            ball.dy *= -1;
            ball.dx *= -1;
            ball.y = platform.y - ball.height;
        }
        if (wasCollide == true) {
            ball.dy = ball.speed;
            ball.dy *= -1;
            ball.y = platform.y - ball.height;
            wasCollide = false;
        }
    }
}
requestAnimationFrame(mainLoop);

// function isCollide(obj1, obj2) {
//     return obj1.x < obj2.x + obj2.width &&
//            obj1.x + obj1.width > obj2.x &&
//            obj1.y < obj2.y + obj2.height &&
//            obj1.y + obj1.height > obj2.y
// }