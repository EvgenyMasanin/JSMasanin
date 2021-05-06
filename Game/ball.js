import { GameObject } from './gameObject.js'

let image10 = new Image();
image10.src = './images/ball.png'

export class Ball extends GameObject{
    constructor({ x, y, side, speed }) {
        super(x, y, side, side, speed)
        this.side = side
    }

    move(canvas, wallSize, field, bonuses, status, platform) {
        for (let i = 0; i < Math.abs(this.dx); i++) {
            if(this.dx < 0){
                this.x -= 1;
                if (platform && this.x < platform.x + platform.width / 3) platform.x -= 1,2;
            }
            else {
                this.x += 1;
                if (platform && this.x > platform.x + 2 * (platform.width / 3)) platform.x += 1,2;
            }

            let isEnd = false;
            
            isEnd = this.brickCollide(field, isEnd, bonuses, status);

            if(isEnd) break
        }
        for (let i = 0; i < Math.abs(this.dy); i++) {
            if(this.dy < 0){
                this.y -=1
            }
            else{
                this.y += 1;
            }

            let isEnd = false;

            isEnd = this.brickCollide(field, isEnd, bonuses, status);

            if (isEnd) break
        }

        if (this.x < wallSize) {
            this.x = wallSize;
            this.dx *= -1;
            
            if(this.dy > 0){
                this.y += 1;
            }
            else if (this.dy < 0) {
                this.y -= 1;
            }
        }
        else if (this.x + this.width > canvas.width - wallSize) {
            this.x = canvas.width - wallSize - this.width;
            this.dx *= -1;

            if (this.dy > 0) {
                this.y += 1;
            }
            else if (this.dy < 0) {
                this.y -= 1;
            }
        }
        if (this.y < wallSize) {
            this.y = wallSize;
            this.dy *= -1;
        }
    }

    brickCollide(field, isEnd, bonuses, status) {
        field.bricks.forEach((el, ind, arr) => {
            isEnd = el.collide(ind, arr, this, bonuses, status);
            if (isEnd) {
                return;
            }
        });
        return isEnd;
    }

    draw(context) {
            // context.fillStyle = 'white';
            // context.beginPath();
            // context.arc(this.x + this.side / 2, this.y + this.side / 2, this.side / 2, 0, Math.PI * 2, false);
            // context.fill();
            context.drawImage(image10, this.x, this.y, this.side, this.side);
    }
};