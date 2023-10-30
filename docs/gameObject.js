export class GameObject {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.speed = speed;
        this.width = width;
        this.height = height;
    }

    static isCollide(obj1, obj2) {
        return obj2.x + obj2.width - 1 >= obj1.x &&
            obj1.x + obj1.width >= obj2.x &&
            obj2.y + obj2.height + obj1.height >= obj1.y + obj1.height &&
            obj1.y + obj1.height >= obj2.y
    }
}