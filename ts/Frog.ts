class Frog {

    public pos: Vector2
    public vel: Vector2
    public rectShape: Rectangle

    private context: CanvasRenderingContext2D
    private cell: number
    private row: number

    constructor (ctx, cell, row) {
        this.context = ctx
        this.cell = cell
        this.row = row

        this.pos = new Vector2(this.cell/2, this.row-1)
        this.vel = new Vector2

        this.rectShape = new Rectangle("green", this.pos, this.cell, this.cell, this.cell)
    }

    draw () {
        this.rectShape.draw()
    }
    move (x, y) {
        this.vel.move(x, y)
        this.pos.move(
            this.pos.x + this.vel.x,
            this.pos.y + this.vel.y,
        )
        
    }
    lose (car: Car): boolean {
        return Rectangle.intersect(car.rectShape, this.rectShape, this.cell)               
    }
    update () {  
        if(this.pos.x < 0) this.pos.x ++
        if(this.pos.x > this.cell-1) this.pos.x --
        if(this.pos.y < 1) {log('victory'); this.pos.y = 0}
        if(this.pos.y > this.row-1) this.pos.y --
    }
}