import { GameObject } from './gameObject.js'
import { Bonus } from './bonuses.js'
let a = []
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

                if (ball.x + ball.width > this.x && ball.x < this.x + this.width &&
                    ball.y + ball.height <= this.y + this.margin) {
                    // alert(`Up
                    //     {this.x  -  }${this.x}
                    //     {this.y  -  }${this.y}
                    //     {this.width  -  }${this.width}
                    //     {this.height  -  }${this.height}
                    //     {ball.x  -  }${ball.x}
                    //     {ball.y  -  }${ball.y}
                    //     {ball.width  -  }${ball.width}
                    //     {ball.height  -  }${ball.height}
                    //     `)
                    if (ball.dy>0)
                    ball.dy *= -1;
                    // ball.y = this.y - ball.height - 2;
                }
                else if (ball.x + ball.width > this.x && ball.x < this.x + this.width &&
                    ball.y >= this.y + this.height - this.margin) {
                    // alert(`Down
                    //     {this.x  -  }${this.x}
                    //     {this.y  -  }${this.y}
                    //     {this.width  -  }${this.width}
                    //     {this.height  -  }${this.height}
                    //     {ball.x  -  }${ball.x}
                    //     {ball.y  -  }${ball.y}
                    //     {ball.width  -  }${ball.width}
                    //     {ball.height  -  }${ball.height}
                    //     `)
                    if (ball.dy<0)
                    ball.dy *= -1;
                    // ball.y = this.y + this.height + ball.height + 2;
                }
                else if (ball.x <= this.x + this.width / 2 &&
                    ball.y + ball.height >= this.y &&
                    ball.y <= this.y + this.height) {
                    // alert(`left
                    //     {this.x  -  }${this.x}
                    //     {this.y  -  }${this.y}
                    //     {this.width  -  }${this.width}
                    //     {this.height  -  }${this.height}
                    //     {ball.x  -  }${ball.x}
                    //     {ball.y  -  }${ball.y}
                    //     {ball.width  -  }${ball.width}
                    //     {ball.height  -  }${ball.height}
                    //     `)
                    if (ball.dx>0)
                    ball.dx *= -1;
                    // ball.x = this.x - ball.width - 2
                }
                else if (ball.x > this.x + this.width / 2 &&
                    ball.y + ball.height >= this.y &&
                    ball.y <= this.y + this.height) {
                    // alert(`right
                    //     {this.x  -  }${this.x}
                    //     {this.y  -  }${this.y}
                    //     {this.width  -  }${this.width}
                    //     {this.height  -  }${this.height}
                    //     {ball.x  -  }${ball.x}
                    //     {ball.y  -  }${ball.y}
                    //     {ball.width  -  }${ball.width}
                    //     {ball.height  -  }${ball.height}
                    //     `)
                    if (ball.dx<0)
                    ball.dx *= -1;
                    // ball.x = this.x + this.width + ball.width + 2
                }


                
                console.log(bonuses);
                this.dropBonus(bonuses)
                return true//Изменить
            }
    }

    increasePreProb(preProb,prob) {
        preProb.prob += prob.probability
        return preProb.prob
    }    

    dropBonus(bonuses) {

        let dropProbability = Math.random() * 100;
        if (dropProbability < Bonus.chnce) {
            let typeProbability = Math.random() * 100;
            let preProb = {prob: 0};

            if(typeProbability < this.increasePreProb(preProb, Bonus.types.platformIncrease)) {
                bonuses.push(new Bonus({
                    x: this.x + this.width / 2,
                    y: this.y + this.height,
                    effect: Bonus.types.platformIncrease,
                    radius: Bonus.types.platformIncrease.radius,
                }));
            }
            else if (typeProbability >= preProb.prob && 
                typeProbability < this.increasePreProb(preProb, Bonus.types.platformDecrease)) {
                bonuses.push(new Bonus({
                    x: this.x + this.width / 2,
                    y: this.y + this.height,
                    effect: Bonus.types.platformDecrease,
                    radius: Bonus.types.platformDecrease.radius,
                }));
            }
            else if (typeProbability >= preProb.prob 
                && typeProbability < this.increasePreProb(preProb, Bonus.types.ballDecrease)) {
                bonuses.push(new Bonus({
                    x: this.x + this.width / 2,
                    y: this.y + this.height,
                    effect: Bonus.types.ballDecrease,
                    radius: Bonus.types.ballDecrease.radius,
                }))
            }
            else if (typeProbability >= preProb.prob 
                && typeProbability < this.increasePreProb(preProb, Bonus.types.ballIncrease)) {
                bonuses.push(new Bonus({
                    x: this.x + this.width / 2,
                    y: this.y + this.height,
                    effect: Bonus.types.ballIncrease,
                    radius: Bonus.types.ballIncrease.radius,
                }))
            }
            else if (typeProbability >= preProb.prob 
                && typeProbability < this.increasePreProb(preProb, Bonus.types.barrier)) {
                bonuses.push(new Bonus({
                    x: this.x + this.width / 2,
                    y: this.y + this.height,
                    effect: Bonus.types.barrier,
                    radius: Bonus.types.barrier.radius,
                }))
            }
            else  {
                bonuses.push(new Bonus({
                    x: this.x + this.width / 2,
                    y: this.y + this.height,
                    effect: Bonus.types.coin,
                    radius: Bonus.types.coin.radius,
                }))
            }
        }
        else if (dropProbability < 20){
            bonuses.push(new Bonus({
                x: this.x + this.width / 2,
                y: this.y + this.height,
                effect: Bonus.types.coin,
                radius: Bonus.types.coin.radius,
            }))
        }
        
     }
};