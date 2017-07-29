class Rectangle {

    public color: string
    public pos: Vector2
    public width: number
    public height: number

    public offset: number

    constructor (color: string, vect: Vector2, width: number, height: number, offset: number = 0) {
        this.color = color
        this.pos = vect
        this.width = width
        this.height = height
        this.offset = offset
    }

    draw () {
        window.context.fillStyle = this.color
        window.context.fillRect(this.pos.x*this.offset, this.pos.y*this.offset, this.width, this.height)
    }

    static intersect (r1: Rectangle, r2: Rectangle, offset) {
        return (
            r1.pos.x*offset < r2.pos.x*offset + r2.width &&
            r1.pos.x*offset + r1.width > r2.pos.x*offset &&
            r1.pos.y*offset < r2.pos.y*offset + r2.height &&
            r1.pos.y*offset + r1.height > r2.pos.y*offset
        )
    }
}