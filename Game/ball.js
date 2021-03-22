import { GameObject } from './gameObject.js'

export class Ball extends GameObject{
    constructor({ x, y, width, height, speed }) {
        super(x, y, width, height, speed)
    }

    mova(canvas, wallSize) {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < wallSize) {
            this.x = wallSize;
            this.dx *= -1;
        }
        else if (this.x + this.width > canvas.width - wallSize) {
            this.x = canvas.width - wallSize - this.width;
            this.dx *= -1;
        }
        if (this.y < wallSize) {
            this.y = wallSize;
            this.dy *= -1;
        }
    }

    draw(context) {
        if (this.dx || this.dy) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
};