import { Ball } from './ball.js';
import { Platform } from './platform.js';
import { field, canvas, context } from './field.js';

export const loseScrin = document.querySelector('.lose-scrin');

let wallSize = field.wallSize;
field.setBricks();

let bonuses = [];

let ball = new Ball({x:270, y:260, side: 5, speed: 3})//2.5
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
        console.log('update');
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        platform.move();

        ball.move(canvas, wallSize, field, bonuses, context);
        
        platform.collide(ball);
        
        this.isLose();
        
        // field.bricks.forEach((el, ind, arr) => {
        //     if (el.collide(ind, arr, ball, bonuses)) {
        //         return
        //     }
        // })
        
        bonuses.forEach(bonus => {
            bonus.move()
        })
        
        bonuses.forEach(bonus => {
            bonus.collide(platform, bonus, ball);
        })

        

        

        field.drawField();

        ball.draw(context);

        platform.draw();

        bonuses.forEach(bonus => {
            console.log('draw');
            console.log(bonus);
            bonus.draw(context);
        })//Изменить

        bonuses.forEach(bonus => {
            bonus.isGone(canvas, bonuses)
        })
    },
};