import { levels } from './levels.js';
import { Brick } from './brick.js';

export const canvas = document.getElementById('game');
export const context = canvas.getContext('2d');

export const field ={
    bricks: [],
    colorMap: {
        R: 'red',
        O: 'orange',
        G: 'green',
        Y: 'yellow',
        Rst: 'red',
        Ost: 'orange',
        Gst: 'green',
        Yst: 'yellow',
        Rdur: 'red',
        Odur: 'orange',
        Gdur: 'green',
        Ydur: 'yellow',
        H: 'gray' //hindrance - помеха
    },
    brick: {
        margin: 2,
        height: 12,
        width: 25,
    },

    wallSize: 12,

    level: levels[0],

    setBricks() {
        this.bricks.splice(0, this.bricks.length)
        for (let i = 0; i < this.level.length; i++) {
            for (let j = 0; j < this.level[i].length; j++) {
                const colorCode = this.level[i][j];
                let strangth;
                if (this.level[i][j] != '') {
                    strangth = 1;
                }
                if (this.level[i][j].endsWith('st')) {
                    strangth = 2;
                }
                else if (this.level[i][j].endsWith('dur')) {
                    strangth = 3;
                }
                else if (this.level[i][j] == 'H') {
                    strangth = 4;
                }
                if (this.level[i][j] != '') {
                    this.bricks.push(new Brick({
                        x: this.wallSize + (this.brick.width + this.brick.margin) * j,
                        y: this.wallSize + (this.brick.height + this.brick.margin) * i,
                        width: this.brick.width,
                        height: this.brick.height,
                        color: this.colorMap[colorCode],
                        strangth: strangth
                    }));
                }
                else {
                    this.bricks.push(new Brick({isExist: false}));
                }
            }
        }
    },

    drawWalls() {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, canvas.width, this.wallSize);
        context.fillRect(0, 0, this.wallSize, canvas.height);
        context.fillRect(canvas.width - this.wallSize, 0, this.wallSize, canvas.height);
    },

    drawField() {
        this.drawWalls()
        field.bricks.forEach(brick => {
            if (brick.strangth == 2) {
                context.fillStyle = 'gray';
                context.fillRect(brick.x, brick.y, brick.width, brick.height);

                context.fillStyle = brick.color;
                context.fillRect(brick.x + 2, brick.y + 2, brick.width - 4, brick.height - 4);
            }
            else if (brick.strangth == 3) {
                context.fillStyle = 'gray';
                context.fillRect(brick.x, brick.y, brick.width, brick.height);

                context.fillStyle = brick.color;
                context.fillRect(brick.x + 4, brick.y + 4, brick.width - 8, brick.height - 8);
            }
            else if (brick.strangth == 4 || brick.strangth == 1) {
                context.fillStyle = brick.color;
                context.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });
    }
}