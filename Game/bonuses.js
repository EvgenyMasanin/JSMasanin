import { GameObject } from './gameObject.js'
import { Platform } from './platform.js'
import { gameRules } from './gameRules.js'

export class Bonus extends GameObject {
    constructor({ x, y, effect, radius = 10, image }) {
        super(x, y, radius * 2, radius * 2, 1.5)
        this.radius = radius;
        this.color = effect.color;
        this.image = image,
        this.effect = effect;
        this.dy = this.speed;
    }
    static chance = gameRules.bonus.chance;
    static coinChance = gameRules.bonus.coinChance;
    static types = {
        platformIncrease: {
            radius: gameRules.bonus.bonusRadius,
            color: 'blueviolet',
            imageSRC: gameRules.bonus.platformIncreaseImageSRC,
            probability: gameRules.bonus.platformIncreaseProbability,
            value: gameRules.bonus.platformIncreaseValue,
            applyBonus(platform, status) {
                if (platform.width < gameRules.bonus.platformMaxWidth) {
                    platform.width += gameRules.bonus.platformResizeValue;
                    platform.x -= gameRules.bonus.platformResizeValue / 2;
                    status.score += this.value;
                }
            }
        },
        platformDecrease: {
            radius: gameRules.bonus.bonusRadius,
            color: 'blue',
            imageSRC: gameRules.bonus.platformDecreaseImageSRC,
            probability: gameRules.bonus.platformDecreaseProbability,
            value: gameRules.bonus.platformDecreaseValue,
            applyBonus(platform, status) {
                if (platform.width > gameRules.bonus.platformMinWidth) {
                    platform.width -= gameRules.bonus.platformResizeValue;
                    platform.x += gameRules.bonus.platformResizeValue / 2;
                    status.score += this.value;
                }
            }
        },
        ballIncrease: {
            radius: gameRules.bonus.bonusRadius,
            color: 'green',
            imageSRC: gameRules.bonus.ballIncreaseImageSRC,
            probability: gameRules.bonus.ballIncreaseProbability,
            value: gameRules.bonus.ballIncreaseValue,
            applyBonus(ball, status) {
                if (ball.side < gameRules.bonus.ballMaxSide) {
                    ball.side += gameRules.bonus.ballResizeValue;
                    ball.width += gameRules.bonus.ballResizeValue;
                    ball.height += gameRules.bonus.ballResizeValue;
                    status.score += this.value;
                }
            }
        },
        ballDecrease: {
            radius: gameRules.bonus.bonusRadius,
            color: 'red',
            imageSRC: gameRules.bonus.ballDecreaseImageSRC,
            probability: gameRules.bonus.ballDecreaseProbability,
            value: gameRules.bonus.ballDecreaseValue,
            applyBonus(ball, status) {
                if (ball.side >= gameRules.bonus.ballMinSide) {
                    ball.side -= gameRules.bonus.ballResizeValue;
                    ball.width -= gameRules.bonus.ballResizeValue;
                    ball.height -= gameRules.bonus.ballResizeValue;
                    status.score += this.value;
                }
            }
        },
        barrier: {
            radius: gameRules.bonus.bonusRadius,
            color: 'pink',
            imageSRC: gameRules.bonus.barierImageSRC,
            probability: gameRules.bonus.barierProbability,
            value: gameRules.bonus.barierValue,
            duration: gameRules.bonus.barierDuration,
            activeTimer: null,
            applyBonus(status) {
                Bonus.setTimer.call(this, status);
            }
        },
        coin: {
            radius: gameRules.bonus.bonusRadius,
            color: 'yellow',
            imageSRC: gameRules.bonus.coinImageSRC,
            probability: gameRules.bonus.coinProbability,
            value: gameRules.bonus.coinValue,
            applyBonus(status) {
                status.score += this.value;
            }
        },
    }

    move() {
        this.y += this.dy;
    };

    static setTimer(status) {
        Platform.isBarierActive = true;
        status.score += this.value;
        drawTimer.call(this, this.duration);
        

        function drawTimer(duration) {
            clearInterval(this.activeTimer)
            let timer = document.querySelector('.timer');
            let internalTimer = document.querySelector('#internal-timer')

            timer.classList.add('visible')

            internalTimer.style.width = 100 + '%';

            let currentWidth = Number.parseInt(internalTimer.style.width);

            this.activeTimer = setInterval(() => {
                if (currentWidth >= 0) {
                    currentWidth -= duration / 60000;
                    internalTimer.style.width = currentWidth + '%';
                }
                else {
                    timer.classList.remove('visible');
                    Platform.isBarierActive = false;
                    clearInterval(this.activeTimer);
                }
            }, duration / 600);
        };
    }

    draw(context) {
        // context.fillStyle = this.color;
        // context.beginPath();
        // context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2, false);
        // context.fill();
        context.drawImage(this.image, this.x , this.y, this.radius * 2 , this.radius * 2);
    };

    isGone(canvas, bonuses) {
        if (this.y > canvas.height) {
            bonuses.shift();
        }
    }

    collide(platform, bonuses, ball, status) {
        if (GameObject.isCollide(this, platform)) {
            switch (this.effect) {
                case Bonus.types.platformIncrease:
                    this.effect.applyBonus(platform, status)
                    break;
                case Bonus.types.platformDecrease:
                    this.effect.applyBonus(platform, status)
                    break;
                case Bonus.types.ballIncrease:
                    this.effect.applyBonus(ball, status)
                    break;
                case Bonus.types.ballDecrease:
                    this.effect.applyBonus(ball, status)
                    break;
                case Bonus.types.barrier:
                    this.effect.applyBonus(status)
                    break;
                case Bonus.types.coin:
                    this.effect.applyBonus(status)
                    break;
            }
            bonuses.y += platform.height + bonuses.radius * 2 + 1;
            bonuses.radius = 0;
        }
    }
}