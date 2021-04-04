import { field, canvas, context } from './field.js'
import { GameObject } from './gameObject.js'

let image11 = new Image();
image11.src = './images/platform.png'

export class Platform extends GameObject {
    constructor({x, y, width, height, speed, color}) {
        super(x, y, width, height, speed);
        this.color = color;
    }

    static isBarierActive = false;

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
        // context.fillStyle = this.color;
        // context.fillRect(this.x, this.y, this.width, this.height);

        context.drawImage(image11, this.x, this.y, this.width, this.height);
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
                ball.x -= 2;
                ball.dx = ball.speed;
                ball.dx *= -1;
            }
            else
                ball.dx = ball.speed * -1;
        }
        else if (GameObject.isCollide(ball, rightSide)) {
            wasCollide = true;
            if (ball.dx < 0) {
                ball.x += 2;
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