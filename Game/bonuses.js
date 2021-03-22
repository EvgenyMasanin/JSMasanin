import { GameObject } from './gameObject.js'

export class Bonus extends GameObject{
    constructor(x, y, color, effect) {
        super(x, y, 10, 10, 1.5)
        this.radius= this.width/2;
        this.chnce= 5;
        this.color= color;
        this.effect= effect; //'grow'
    }

    move() {
        this.dy = this.speed;
        this.y += this.dy;
    };

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2, false);
        context.fill();
    };

    isGone(canvas, bonuses) {
        if (this.y > canvas.height) {
            bonuses.splice(0, 1);
        }
    }

    bonus(platform, bonuses) {
        if (GameObject.isCollide(this, platform)) {
            if (this.effect == 'grow') {
                platform.width += 40;
                platform.x -= 20;
                bonuses.splice(0, 1)
            }
        }
    }
}