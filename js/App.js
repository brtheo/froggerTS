class Rectangle {
    constructor(color, vect, width, height, offset = 0) {
        this.color = color;
        this.pos = vect;
        this.width = width;
        this.height = height;
        this.offset = offset;
    }
    draw() {
        window.context.fillStyle = this.color;
        window.context.fillRect(this.pos.x * this.offset, this.pos.y * this.offset, this.width, this.height);
    }
    static intersect(r1, r2, offset) {
        return (r1.pos.x * offset < r2.pos.x * offset + r2.width &&
            r1.pos.x * offset + r1.width > r2.pos.x * offset &&
            r1.pos.y * offset < r2.pos.y * offset + r2.height &&
            r1.pos.y * offset + r1.height > r2.pos.y * offset);
    }
}
const log = console.log.bind(console);
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
    static compare(v1, v2) {
        return v1.x === v2.x && v1.y === v2.y;
    }
}
class Car {
    constructor(ctx, cell, px, py, vx, width, color = "#e0e0e0") {
        this.context = ctx;
        this.cell = cell;
        this.pos = new Vector2(px, py);
        this.vel = new Vector2(vx);
        this.width = width;
        this.color = color;
        this.rectShape = new Rectangle(this.color, this.pos, this.width, this.cell, this.cell);
    }
    draw() {
        this.rectShape.draw();
    }
    update() {
        if (this.pos.x < 0)
            this.pos.x = this.cell - 1;
        if (this.pos.x > this.cell - 1)
            this.pos.x = 0;
        this.pos.x += this.vel.x;
    }
}
class Frog {
    constructor(ctx, cell, row) {
        this.context = ctx;
        this.cell = cell;
        this.row = row;
        this.pos = new Vector2(this.cell / 2, this.row - 1);
        this.vel = new Vector2;
        this.rectShape = new Rectangle("green", this.pos, this.cell, this.cell, this.cell);
    }
    draw() {
        this.rectShape.draw();
    }
    move(x, y) {
        this.vel.move(x, y);
        this.pos.move(this.pos.x + this.vel.x, this.pos.y + this.vel.y);
    }
    lose(car) {
        return Rectangle.intersect(car.rectShape, this.rectShape, this.cell);
    }
    update() {
        if (this.pos.x < 0)
            this.pos.x++;
        if (this.pos.x > this.cell - 1)
            this.pos.x--;
        if (this.pos.y < 1) {
            log('victory');
            this.pos.y = 0;
        }
        if (this.pos.y > this.row - 1)
            this.pos.y--;
    }
}
window.canvas = document.querySelector('canvas');
window.context = window.canvas.getContext('2d');
class Game {
    constructor() {
        this.goal = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0];
        this.canvas = window.canvas;
        this.context = window.context;
        this.cell = Math.sqrt(this.canvas.width);
        this.row = this.canvas.height / this.cell;
        this.cars = [
            new Car(this.context, this.cell, 1, 1, -1, 55),
            new Car(this.context, this.cell, 10, 1, -1, 55, "blue"),
            new Car(this.context, this.cell, 4, 5, 1, 55, "orange"),
            new Car(this.context, this.cell, 6, 10, -.5, 55, "red")
        ];
        this.frog = new Frog(this.context, this.cell, this.row);
        window.document.addEventListener('keydown', this.inputHandler.bind(this));
        setInterval(this.update.bind(this), 60);
    }
    draw() {
        this.context.fillStyle = "#252525";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.goal.forEach((cell, i) => {
            if (cell === 0) {
                this.context.fillStyle = "#252525";
                this.context.fillRect(i * this.cell, 0, this.cell, this.cell);
            }
            else {
                this.context.fillStyle = "#796548";
                this.context.fillRect(i * this.cell, 0, this.cell, this.cell);
            }
        });
        this.cars.forEach(car => car.draw());
        this.frog.draw();
    }
    update() {
        this.draw();
        this.frog.update();
        this.cars.forEach(car => {
            car.update();
            if (this.frog.lose(car)) {
                log("lose");
                this.frog.pos.move(this.cell / 2, this.row - 1);
            }
        });
    }
    inputHandler(e) {
        switch (e.keyCode) {
            case 37:
                this.frog.move(-1, 0);
                break;
            case 38:
                this.frog.move(0, -1);
                break;
            case 39:
                this.frog.move(1, 0);
                break;
            case 40:
                this.frog.move(0, 1);
                break;
        }
    }
}
let game = new Game();
