const log = console.log.bind(console)
class Vector2 {

    public x: number
    public y: number

    constructor (x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    move (x, y) {
        this.x = x
        this.y = y
    }

    static compare (v1: Vector2, v2: Vector2) {
        return v1.x === v2.x && v1.y === v2.y
    }
}