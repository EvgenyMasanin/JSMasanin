export function Bonus(x, y, color, effect){
    this.x = x;
    this.y = y;
    this.dy= 0;
    this.speed= 1.5;
    this.width= 10;
    this.height= 10;
    this.radius= this.width/2;
    this.chnce= 5;
    this.color= 'red';
    this.effect= 'grow';

    this.moveBonuse = function(){
        this.dy = this.speed;
        this.y += this.dy;
    };

    this.drawBonus = function(context){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2, false);
        context.fill();
    };

    this.isGone = function(canvas, bonuses){
        if(this.y > canvas.height) {
            bonuses.splice(0,1);
        }
    }
};