import { GameObject } from './gameObject.js';
import { Ball } from './ball.js';
import { Platform } from './platform.js';
import { field, canvas, context } from './field.js';
import { Bonus } from './bonuses.js';

export const loseScrin = document.querySelector('.lose-scrin');

let wallSize = field.wallSize;
let brick = field.brick;
field.setBricks();

let bonuses = [];

let ball = new Ball({x:330, y:260, width: 5, height: 5, speed: 2.5})
let platform = new Platform()

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
        platform.width = 50;
    },

    isLose() {
        if (ball.y > canvas.height) {
            loseScrin.classList.add('visible');
            ball.x = 130;
            ball.y = 260;
            ball.dx = 0;
            ball.dy = 0;
            bonuses = [];
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
        
        platform.move();

        bonuses.forEach(bonus => {
            bonus.move()
        })

        ball.mova(canvas, wallSize);
        
        this.isLose();

        platform.collide(ball);

        field.bricks.forEach((el, ind, arr) => {
            if(el.collide(ind, arr, ball, bonuses)) {
                return
            }
        })

        bonuses.forEach(bonus => {
            bonus.bonus(platform, bonuses);
        })

        drawWalls();

        ball.draw(context);

        drawField();

        platform.draw();

        bonuses.forEach(bonus => {
            bonus.draw(context);
        })

        bonuses.forEach(bonus => {
            bonus.isGone(canvas, bonuses)
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

        // function bonusCollide(el) {
        //     if (GameObject.isCollide(el, platform)) {
        //         if (el.effect == 'grow') {
        //             platform.width +=40;
        //             platform.x -= 20;
        //             bonuses.splice(0,1)
        //         }
        //     }
        // }

    },
};