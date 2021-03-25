import { GameObject } from './gameObject.js'

export class Bonus extends GameObject {
    constructor({ x, y, effect, radius = 5 }) {
        super(x, y, 10, 10, 1.5)
        this.radius = radius;
        this.color = effect.color;
        console.log(this.color);
        this.effect = effect;
    }
    static chnce = 6;
    static types = {
        platformIncrease: {
            radius: 5,
            color: 'blueviolet',
            probability: 13,
            applyBonus(platform) {
                platform.width += 10;
                platform.x -= 5;
            }
        },
        ballIncrease: {
            radius: 5,
            color: 'green',
            probability: 13,
            applyBonus(ball) {
                if (ball.side < 15) {
                    ball.side +=2;
                    ball.width += 2;
                    ball.height += 2;
                }
            }
        },
        platformDecrease: {
            radius: 5,
            color: 'blue',
            probability: 15,
            applyBonus(platform) {
                if (platform.width > 20) {
                    platform.width -= 10;
                    platform.x += 5;
                }
            }
        },
        ballDecrease: {
            radius: 5,
            color: 'red',
            probability: 15,
            applyBonus(ball) {
                if (ball.side > 3) {
                    ball.side -= 2;
                    ball.width -= 2;
                    ball.height -= 2;
                }
            }
        },
        barrier: {
            radius: 5,
            color: 'pink',
            probability: 12,
            applyBonus() {

            }
        },
        coin: {
            radius: 10,
            color: 'yellow',
            probability: 42,
            applyBonus() {

            }
        },
    }

    move() {
        this.dy = this.speed;
        this.y += this.dy;
    };

    draw(context) {
        context.fillStyle = this.color;
        console.log('from draw');
        console.log(this.effect);
        console.log('fillStyle');
        console.log(context.fillStyle);
        context.beginPath();
        context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2, false);
        context.fill();
    };

    isGone(canvas, bonuses) {
        if (this.y > canvas.height) {
            bonuses.shift();
        }
    }

    collide(platform, bonuses, ball) {
        if (GameObject.isCollide(this, platform)) {
            switch (this.effect) {
                case Bonus.types.platformIncrease:
                    this.effect.applyBonus(platform)
                    break;
                case Bonus.types.platformDecrease:
                    this.effect.applyBonus(platform)
                    break;
                case Bonus.types.ballIncrease:
                    this.effect.applyBonus(ball)
                    break;
                case Bonus.types.ballDecrease:
                    this.effect.applyBonus(ball)
                    break;
                case Bonus.types.barrier:
                    break;
                case Bonus.types.coin:
                    console.log('coin');
                    break;
            }
            bonuses.y += platform.height + bonuses.radius + 1;
            bonuses.radius = 0;
        }
    }
}