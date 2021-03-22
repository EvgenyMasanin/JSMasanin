import { GameObject } from './gameObject.js'
import { Bonus } from './bonuses.js'

export class Brick extends GameObject {
    constructor({ x, y, width, height, color, strangth, isExist }) {
        super(x, y, width, height)
        this.color = color
        this.strangth = strangth
        this.isExist = isExist
        this.margin = 2
    }


    collide(ind, arr, ball, bonuses) {
            if (this.isExist == false)
                return false
            if (GameObject.isCollide(ball, this)) {
                if (this.strangth == 1) {
                    arr.splice(ind, 1);
                }
                else if (this.strangth > 1 && this.strangth < 4) {
                    this.strangth--;
                }
                if (ball.x + ball.width > this.x &&
                    ball.x < this.x + this.width &&
                    ball.y + ball.height <= this.y + this.margin) {
                    ball.dy *= -1;
                    ball.y = this.y - ball.height - 2;
                }
                else if (ball.x + ball.width > this.x &&
                    ball.x < this.x + this.width &&
                    ball.y >= this.y + this.height - this.margin) {
                    ball.dy *= -1;
                    ball.y = this.y + this.height + ball.height + 2;
                }
                else if (ball.x <= this.x + this.width / 2 &&
                    ball.y + ball.height >= this.y &&
                    ball.y <= this.y + this.height) {
                    ball.dx *= -1;
                    ball.x = this.x - ball.width - 2
                }
                else if (ball.x > this.x + this.width / 2 &&
                    ball.y + ball.height >= this.y &&
                    ball.y <= this.y + this.height) {
                    ball.dx *= -1;
                    ball.x = this.x + this.width + ball.width + 2
                }
                //временный дебагер
                else {
                    alert(`?
                            ball.x = ${ball.x}
                            ball.y = ${ball.y}
                            ball.width = ${ball.width}
                            ball.heght = ${ball.height}
                            currentBrick.x = ${this.x}
                            currentBrick.y = ${this.y}
                            currentBrick.width = ${this.width}
                            currentBrick.heght = ${this.height}
                            `)
                }
                let r = Math.round(Math.random() * 100 + 1);
                let chance = [1, 2, 3, 4, 5];
                console.log(r);
                if (chance.includes(r)) {
                    bonuses.push(new Bonus(this.x + this.width / 2,
                        this.y + this.height, 'red', 'grow'))
                }
                return true;
            }
    }
    
};