import { GameObject } from './gameObject.js'

export class Ball extends GameObject{
    constructor({ x, y, side, speed }) {
        super(x, y, side, side, speed)
        this.side = side
    }

    move(canvas, wallSize, field, bonuses, context) {
        for (let i = 0; i <Math.abs(this.dx); i++) {
            // alert(`from dx ${this.dx}`)
            if(this.dx<0){
                this.x -=1;
            }
            else {
            this.x += 1;
            }
            let isEnd = false;
            field.bricks.forEach((el, ind, arr) => {
                isEnd = el.collide(ind, arr, this, bonuses)
            if (isEnd) {
                return
            }
        })
        if(isEnd)
        break
        }
        for (let i = 0; i < Math.abs(this.dy); i++) {
            // alert(`from dy ${this.dy}`)
            if(this.dy <0){
                this.y -=1
            }else{
            this.y += 1;
            }
            let isEnd = false;
            field.bricks.forEach((el, ind, arr) => {
                isEnd = el.collide(ind, arr, this, bonuses)
                if (isEnd) {
                    return
                }
            })
            if (isEnd)
                break
        }

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
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.side, this.side);
        }
    }
};