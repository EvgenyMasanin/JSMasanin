import { field, canvas, context } from './field.js'
export const platform = {
    x: canvas.width / 2 - field.brick.width / 2,
    y: 440,
    width: 376,//100,
    height: 12,
    speed: 5,
    dx: 0,

    movePlatform() {
        this.x += this.dx;

        if (this.x < field.wallSize) {
            this.x = field.wallSize;
        }
        else if (this.x + this.width > canvas.width - field.wallSize) {
            this.x = canvas.width - field.wallSize - this.width;
        }
    },

    drawPlatform() {
        context.fillStyle = 'cyan';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};