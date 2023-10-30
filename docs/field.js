import { levels } from './levels.js';
import { Brick } from './brick.js';
import { gameRules } from './gameRules.js';

export const canvas = document.getElementById('game');
export const context = canvas.getContext('2d');
 
canvas.style.width = `${gameRules.canvas.width}px`
canvas.style.height = `${gameRules.canvas.height}px`
canvas.style.backgroundImage = `url(${gameRules.canvas.backgroundImageSRC})`



export const field ={
    bricks: [],
    colorMap: gameRules.field.colorMap,
    
    brick: {
        margin: gameRules.field.margin,
        height: gameRules.field.height,
        width: gameRules.field.width,
    },

    wallSize: gameRules.field.wallSize,
    imageV: new Image(),
    imageH: new Image(),

    _level: levels[0],

    get level() {
        return this._level;
    },

    set level(numb) {
        this._level = levels[numb]
    },

    init(level) {
        this.level = level;
        this.setBricks();
        this.imageV.src = gameRules.field.verticalWallImageSRC;
        this.imageH.src = gameRules.field.horizontalWallImageSRC;
    },

    setBricks() {
        this.bricks.splice(0, this.bricks.length)
        for (let i = 0; i < this.level.length; i++) {
            for (let j = 0; j < this.level[i].length; j++) {
                const colorCode = this.level[i][j];
                let strangth;
                if (this.level[i][j] != '') {
                    strangth = 1;
                }
                if (this.level[i][j].endsWith('11')) {
                    strangth = 3;
                }
                else if (this.level[i][j].endsWith('1')) {
                    strangth = 2;
                }
                else if (this.level[i][j] == 'U') {
                    strangth = 4;
                }

                let image = new Image();
                if (colorCode != '')
                image.src = this.colorMap[colorCode]
                if (this.level[i][j] != '') {
                    this.bricks.push(new Brick({
                        x: this.wallSize + this.brick.margin / 2 + (this.brick.width + this.brick.margin) * j,
                        y: this.wallSize + (this.brick.height + this.brick.margin) * i,
                        width: this.brick.width,
                        height: this.brick.height,
                        imageCode: this.level[i][j],
                        image: image,
                        strangth: strangth,
                        isExist: true,
                    }));
                }
                else {
                    this.bricks.push(new Brick({isExist: false}));
                }
            }
        }
    },

    drawWalls() {
        context.drawImage(this.imageH, this.wallSize, 0, canvas.width - this.wallSize, this.wallSize)
        context.drawImage(this.imageV, 0, 0, this.wallSize, canvas.height)
        context.drawImage(this.imageV, canvas.width - this.wallSize, 0, this.wallSize, canvas.height)
    },

    drawField() {
        this.drawWalls();

        field.bricks.forEach(brick => {
            if(brick.isExist){
                context.drawImage(brick.image, brick.x, brick.y, brick.width, brick.height);
            }
        });
    }
}