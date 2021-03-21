import { ball } from './ball.js';
import { platform } from './platform.js';
import { field, canvas, context } from './field.js';
import { Bonus } from './bonuses.js';

export const loseScrin = document.querySelector('.lose-scrin');

let wallSize = field.wallSize;
let brick = field.brick;
field.setBricks();

let bonuses = [];

export const game = {

    addEventMove( moveLeftButtonCode, moveRightButtonCode, startButtonCode){
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
    },

    restart() {
        field.setBricks();

        platform.x = canvas.width / 2 - platform.width / 2;
        platform.y = 440;
    },

    isLose() {
        if (ball.y > canvas.height) {
            loseScrin.classList.add('visible');
            ball.x = 130;
            ball.y = 260;
            ball.dx = 0;
            ball.dy = 0;

            document.addEventListener('keydown', function listener() {
                loseScrin.classList.remove('visible');
                loseScrin.classList.add('hedden');
                game.restart();
                document.removeEventListener('keydown', listener);

            });
        }
    },

    mainLoop(){
        
        requestAnimationFrame(game.mainLoop.bind(game));
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        platform.movePlatform();

        bonuses.forEach(el => {
            el.moveBonuse()
        })

        ball.movaBall(canvas, wallSize);
        
        this.isLose();

        platformCollide();

        brickCollide();

        bonuses.forEach(el => {
            bonusCollide(el);
        })
        // bonusCollide();

        drawWalls();

        ball.drawBall(context);

        drawField();

        platform.drawPlatform();

        bonuses.forEach(el=>{
            el.drawBonus(context);
        })

        bonuses.forEach(el => {
            el.isGone(canvas, bonuses)
        })

        function drawWalls() {
            context.fillStyle = 'lightgray';
            context.fillRect(0, 0, canvas.width, wallSize);
            context.fillRect(0, 0, wallSize, canvas.height);
            context.fillRect(canvas.width - wallSize, 0, wallSize, canvas.height);
        }

        function drawField() {
            field.bricks.forEach(brick => {
                if (brick.strangth == 2) {
                    context.fillStyle = 'gray';
                    context.fillRect(brick.x, brick.y, brick.width, brick.height);

                    context.fillStyle = brick.color;
                    context.fillRect(brick.x + 2, brick.y + 2, brick.width - 4, brick.height - 4);
                }
                else if (brick.strangth == 3) {
                    context.fillStyle = 'gray';
                    context.fillRect(brick.x, brick.y, brick.width, brick.height);

                    context.fillStyle = brick.color;
                    context.fillRect(brick.x + 4, brick.y + 4, brick.width - 8, brick.height - 8);
                }
                else if (brick.strangth == 4 || brick.strangth == 1) {
                    context.fillStyle = brick.color;
                    context.fillRect(brick.x, brick.y, brick.width, brick.height);
                }
            });
        };

        function brickCollide() {
            for (let i = 0; i < field.bricks.length; i++) {
                if (field.bricks[i] == {})
                    continue;
                const currentBrick = field.bricks[i];
                if (isCollide(ball, currentBrick)) {
                    if (currentBrick.strangth == 1) {
                        field.bricks.splice(i, 1);
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
                    let r = Math.round(Math.random() * 100 + 1);
                    let chance = [1,2,3,4,5];
                    console.log(r);
                    if (chance.includes(r)) {
                        bonuses.push(new Bonus(currentBrick.x + currentBrick.width / 2, currentBrick.y + currentBrick.height))
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
            if (isCollide(ball, leftSide)) {
                wasCollide = true;
                if (ball.dx > 0) {
                    ball.dx = ball.speed;
                    ball.dx *= -1;
                }
                else
                    ball.dx = ball.speed * -1;
            }
            else if (isCollide(ball, rightSide)) {
                wasCollide = true;
                if (ball.dx < 0) {
                    ball.dx = ball.speed * -1
                    ball.dx *= -1;
                }
                else
                    ball.dx = ball.speed
            }
            else if (isCollide(ball, centralSide)) {
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

        function bonusCollide(el) {
            if (isCollide(el, platform)) {
                if (el.effect == 'grow') {
                    platform.width +=40;
                    platform.x -= 20;
                    bonuses.splice(0,1)
                }
            }
        }

        function isCollide(ball, obj) {
            return obj.x + obj.width - 1 >= ball.x &&
                ball.x + ball.width >= obj.x &&
                obj.y + obj.height + ball.height >= ball.y + ball.height &&
                ball.y + ball.height >= obj.y
        }
    },
};