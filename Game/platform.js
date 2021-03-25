import { field, canvas, context } from './field.js'
import { GameObject } from './gameObject.js'

export class Platform extends GameObject {
    constructor() {
        super((canvas.width / 2 - field.brick.width / 2), 440, 100, 12, 5);
    }

    move() {
        this.x += this.dx;

        if (this.x < field.wallSize) {
            this.x = field.wallSize;
        }
        else if (this.x + this.width > canvas.width - field.wallSize) {
            this.x = canvas.width - field.wallSize - this.width;
        }
    }

    draw() {
        context.fillStyle = 'cyan';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    collide(ball) {
        let leftSide = Object.create(this),
            rightSide = Object.create(this),
            centralSide = Object.create(this);

        leftSide.width = rightSide.width = centralSide.width = this.width / 3;
        centralSide.x = this.x + this.width / 3;
        rightSide.x = this.x + 2 * (this.width / 3);

        let wasCollide = false;
        if (GameObject.isCollide(ball, leftSide)) {
            wasCollide = true;
            if (ball.dx > 0) {
                ball.dx = ball.speed;
                ball.dx *= -1;
            }
            else
                ball.dx = ball.speed * -1;
        }
        else if (GameObject.isCollide(ball, rightSide)) {
            wasCollide = true;
            if (ball.dx < 0) {
                ball.dx = ball.speed * -1
                ball.dx *= -1;
            }
            else
                ball.dx = ball.speed
        }
        else if (GameObject.isCollide(ball, centralSide)) {
            ball.dy = ball.speed + 1;
            ball.dx = ball.speed - 2;
            ball.dy *= -1;
            ball.dx *= -1;
            ball.y = this.y - ball.height;
        }
        if (wasCollide == true) {
            ball.dy = ball.speed;
            ball.dy *= -1;
            ball.y = this.y - ball.height;
            wasCollide = false;
        }
    }
};