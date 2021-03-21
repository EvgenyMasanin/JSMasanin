export const ball = {
    x: 330,
    y: 260,
    width: 5,
    height: 5,
    speed: 2.5, //0-3
    dx: 0,
    dy: 0,

    movaBall(canvas, wallSize) {
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
    },

    drawBall(context) {
        if (this.dx || this.dy) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
};