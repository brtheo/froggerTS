class Car {

    public pos: Vector2
    public vel: Vector2
    public rectShape: Rectangle
    public color: string
    public width: number

    private context: CanvasRenderingContext2D
    private cell: number


    constructor (ctx, cell, px, py, vx, width, color = "#e0e0e0") {
        this.context = ctx
        this.cell = cell

        this.pos = new Vector2(px, py)
        this.vel = new Vector2(vx)
        this.width = width
        this.color = color

        this.rectShape = new Rectangle(this.color, this.pos, this.width, this.cell, this.cell)
    }

    draw () {
        this.rectShape.draw()
    }

    update () {
        if(this.pos.x < 0) this.pos.x = this.cell-1
        if(this.pos.x > this.cell-1) this.pos.x = 0

        this.pos.x += this.vel.x
    }
}