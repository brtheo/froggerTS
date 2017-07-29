interface Window {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
}

window.canvas = document.querySelector('canvas')
window.context = window.canvas.getContext('2d')

class Game {

    public canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D 

    public cars: Car[]
    public frog: Frog

    public cell: number
    public row: number

    public goal: number[] = [0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0]


    constructor () {

        this.canvas = window.canvas
        this.context = window.context

        this.cell = Math.sqrt(this.canvas.width)
        this.row = this.canvas.height/this.cell

        this.cars = [
            new Car(this.context, this.cell, 1, 1, -1, 55),
            new Car(this.context, this.cell, 10, 1, -1, 55, "blue"),
            new Car(this.context, this.cell, 4, 5, 1, 55, "orange"),
            new Car(this.context, this.cell, 6, 10, -.5, 55, "red")
        ]

        this.frog = new Frog(this.context, this.cell, this.row)

        window.document.addEventListener('keydown', this.inputHandler.bind(this))

        setInterval(this.update.bind(this), 60)

    }

    draw () {
        this.context.fillStyle = "#252525"
        this.context.fillRect(0,0,this.canvas.width, this.canvas.height)
        this.goal.forEach( (cell, i) => {
            if(cell === 0) {
                this.context.fillStyle = "#252525"
                this.context.fillRect(i*this.cell, 0, this.cell, this.cell)
            }
            else {
                this.context.fillStyle = "#796548"
                this.context.fillRect(i*this.cell, 0, this.cell, this.cell)
            }
        } )
        
        this.cars.forEach( car => car.draw())
        this.frog.draw()
        
    }

    update () {  
        this.draw()  
        this.frog.update()
        this.cars.forEach( car => {
            car.update()
            if(this.frog.lose(car)) {
                log("lose")
                this.frog.pos.move(this.cell/2, this.row-1)
            }
        })

    }

    inputHandler (e: KeyboardEvent) {
        switch(e.keyCode) {
            case 37: 
                this.frog.move(-1,0)
                break
            case 38: 
                this.frog.move(0,-1)
                break
            case 39: 
                this.frog.move(1,0)                
                break
            case 40: 
                this.frog.move(0,1)
                break
        }
    }
}


let game = new Game()