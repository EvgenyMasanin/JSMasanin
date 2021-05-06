import { GameObject } from './gameObject.js'
import { Bonus } from './bonuses.js'
import { field } from './field.js'
import { gameRules } from './gameRules.js'

export class Brick extends GameObject {
    constructor({ x, y, width, height,imageCode, image, strangth, isExist }) {
        super(x, y, width, height)
        this.imageCode = imageCode
        this.image = image
        this.strangth = strangth
        this.isExist = isExist
        this.margin = 2
    }

    collide(ind, arr, ball, bonuses, status) {

        if (!this.isExist) {
            return false
        }

        if (GameObject.isCollide(ball, this)) {
            if (this.strangth == 1) {
                arr.splice(ind, 1);
                status.score += gameRules.brickValue;
            }
            else if (this.strangth > 1 && this.strangth < 4) {
                this.strangth--;
                let newImgCode = this.imageCode.slice(0, -1)
                this.imageCode = newImgCode;

                let newImage = new Image();
                newImage.src = field.colorMap[newImgCode]
                this.image = newImage;
            }

            if (ball.x + ball.width > this.x && 
                ball.x < this.x + this.width &&
                ball.y + ball.height <= this.y + this.margin) {

                if (ball.dy > 0) {
                    ball.dy *= -1;
                }

                ball.y -= 2;
            }
            else if (ball.x + ball.width > this.x && 
                     ball.x < this.x + this.width &&
                     ball.y >= this.y + this.height - this.margin) {

                if (ball.dy < 0) {
                    ball.dy *= -1;
                }

                ball.y += 2;
            }
            else if (ball.x <= this.x + this.width / 2 &&
                     ball.y + ball.height >= this.y &&
                     ball.y <= this.y + this.height) {

                if (ball.dx > 0) {
                    ball.dx *= -1;
                }

                ball.x -= 2;
            }
            else if (ball.x > this.x + this.width / 2 &&
                     ball.y + ball.height >= this.y &&
                     ball.y <= this.y + this.height) {
               
                if (ball.dx < 0) {
                    ball.dx *= -1;
                }

                ball.x += 2;
            }

            this.dropBonus(bonuses);

            return true;
        }
    }

    dropBonus(bonuses) {
        if (this.strangth < 4) {
            let dropProbability = Math.random() * 100;

            if (dropProbability < Bonus.chance) {
                let typeProbability = Math.random() * 100;
                let preProb = { prob: 0 };

                if (typeProbability < this.increasePreProb(preProb, Bonus.types.platformIncrease)) {
                    this.pushBonus(bonuses, Bonus.types.platformIncrease);
                }
                else if (typeProbability >= preProb.prob &&
                    typeProbability < this.increasePreProb(preProb, Bonus.types.platformDecrease)) {
                    this.pushBonus(bonuses, Bonus.types.platformDecrease);
                }
                else if (typeProbability >= preProb.prob
                    && typeProbability < this.increasePreProb(preProb, Bonus.types.ballDecrease)) {
                    this.pushBonus(bonuses, Bonus.types.ballDecrease);
                }
                else if (typeProbability >= preProb.prob
                    && typeProbability < this.increasePreProb(preProb, Bonus.types.ballIncrease)) {
                    this.pushBonus(bonuses, Bonus.types.ballIncrease);
                }
                else if (typeProbability >= preProb.prob
                    && typeProbability < this.increasePreProb(preProb, Bonus.types.barrier)) {
                    this.pushBonus(bonuses, Bonus.types.barrier);
                }
                else {
                    this.pushBonus(bonuses, Bonus.types.coin);
                }
            }
            else if (dropProbability < Bonus.coinChance) {
                this.pushBonus(bonuses, Bonus.types.coin);
            }
        }
    }
    
    increasePreProb(preProb, prob) {
        preProb.prob += prob.probability
        return preProb.prob
    }

    pushBonus(bonuses, effect) {
        let image = new Image();
        image.src = effect.imageSRC
        bonuses.push(new Bonus({
            x: this.x + this.width / 2,
            y: this.y + this.height,
            effect: effect,
            radius: effect.radius,
            image:  image,
        }))
    }
};