import { field, canvas, context } from './field.js';
import { Ball } from './ball.js';
import { Platform } from './platform.js';

import { levels } from './levels.js';
import { Status } from './status.js'
import { gameRules } from './gameRules.js'

export let bonusRules = gameRules.bonus;

export const loseScrin = document.querySelector('#lose-scrin');
export const winScrin = document.querySelector('#win-scrin');

let bonuses = [];

const status = new Status({
    level: gameRules.status.level,
    health: gameRules.status.health,
    player: gameRules.status.player,
    score: gameRules.status.score});

const platform = new Platform({
    x: gameRules.platform.x,
    y: gameRules.platform.y,
    width: gameRules.platform.width,
    height: gameRules.platform.height,
    speed: gameRules.platform.speed,
    color: gameRules.platform.color
});

const barier = new Platform({
    x: gameRules.barier.x,
    y: gameRules.barier.y,
    width: gameRules.barier.width,
    height: gameRules.barier.height,
    speed: gameRules.barier.speed,
    color: gameRules.barier.color
});

const ball = new Ball({
    x: gameRules.ball.x,
    y: gameRules.ball.y,
    side: gameRules.ball.side,
    speed: gameRules.ball.speed
});

field.init(status.level)

export const game = {

    isStarted: false,

    addEventMove(moveLeftButtonCode, moveRightButtonCode, startButtonCode){
        document.addEventListener('keydown', e => {
            if (e.code === moveLeftButtonCode) {
                platform.dx = -platform.speed;
            }
            else if (e.code === moveRightButtonCode) {
                platform.dx = platform.speed;
            }

            if (ball.dx === 0 && ball.dy === 0 && e.code === startButtonCode) {
                this.isStarted = true;
                ball.dy = ball.speed * -2;
            }
        });
        document.addEventListener('keyup', e => {
            if (e.code == moveLeftButtonCode || e.code == moveRightButtonCode) {
                platform.dx = 0;
            }
        })
    },

    changeLevel() {
        if (status.level < levels.length - 1){
            status.level = ++status.level
            field.init(status.level)
        }
        else {
            alert('Вы прошли игру!!!')
        }
    },

    ballPosBeforeStart() {
        if(!this.isStarted) {
            ball.x = platform.x + platform.width / 2 - ball.side / 2;
            ball.y = ball.y = platform.y - ball.side - 1;
        }
    },

    restart() {
        field.setBricks();
        platform.x = gameRules.platform.x;
        platform.y = gameRules.platform.y;
        platform.width = gameRules.platform.width;
        ball.side = gameRules.ball.side;
        status.health = gameRules.status.health;
        status.score = gameRules.status.score;
        this.changeLevel();
    },

    stop() {
        ball.dx = 0;
        ball.dy = 0;
    },

    isLose(status) {
        if (ball.y > canvas.height) {
            this.isStarted = false;
            this.ballPosBeforeStart();
            this.stop();
            bonuses = [];
            if(status.health <= 1) {
                loseScrin.classList.add('visible');
                status.score -= 200;
                status.health--;
                document.addEventListener('keydown', function listener() {
                    loseScrin.classList.remove('visible');
                    game.restart();
                }, { once: true });
            }
            else {
                status.score -= 200;
                status.health--;
            }
        }
    },

    isWin() {
        if(this.isStarted){
            if(!field.bricks.find(brick => brick.isExist && brick.imageCode != 'U')){
                this.isStarted = false;
                winScrin.classList.add('visible');
                this.ballPosBeforeStart();
                this.stop()
                bonuses = [];
                document.addEventListener('keydown', function listener() {
                    winScrin.classList.remove('visible');
                    game.restart();
                    // document.removeEventListener('keydown', listener);
                }, { once: true });
            }
        }
    },

    mainLoop(){
        
        requestAnimationFrame(game.mainLoop.bind(game));
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        this.ballPosBeforeStart();

        

        ball.move(canvas, field.wallSize, field, bonuses, status);
        
        platform.move();
        
        platform.collide(ball);
        
        this.isWin();
        this.isLose(status);
        
        bonuses.forEach(bonus => {
            bonus.move()
        })
        
        bonuses.forEach(bonus => {
            bonus.collide(platform, bonus, ball, status);
        })

        if (Platform.isBarierActive) {
            barier.collide(ball);
            barier.draw();
        }

        

        status.updateStatus();

        ball.draw(context);

        platform.draw();
        
        field.drawField();

        bonuses.forEach(bonus => {
            bonus.draw(context);
        })//Изменить

        bonuses.forEach(bonus => {
            bonus.isGone(canvas, bonuses)
        })

    },
};