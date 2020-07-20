/*---Guardo los elementos HTML en variables---*/
const btnPLay = document.getElementById('btnPlay')
const blue = document.getElementById('blue')
const yellow = document.getElementById('yellow')
const green = document.getElementById('green')
const red = document.getElementById('red')
const FINAL_LEVEL = 10

/*---En esta clase Game se encuentra toda la logica del juego y es la que controlará cada elemento en el html---*/
class Game {
  constructor(){
    this.initialize = this.initialize.bind(this)
    this.initialize() //Inicializa la función del objeto apenas se ejcuta
    this.createSequence() // Inica la secuencia de numeros que se agregan al objeto nuevo
    setTimeout(this.nextLevel(), 500) // Incializa el avance al siguiente nivel
  } 

  /*Le da los atributos básicos al objeto*/
  initialize(){ 
    this.nextLevel = this.nextLevel.bind(this)
    this.pickColor = this.pickColor.bind(this) // de esta forma se ancla para que en el método addEventClick, el this haga referencia a la clase game y no al boton
    this.toggleBtnStart()
    this.level = 1 // Nivel en el que incia el juego y que irá incrementando a medida que vaya avanzando
    this.colors = {
      blue,
      yellow,
      green,
      red
    } //selector de los colores
  }

  toggleBtnStart(){
    if (btnPlay.classList.contains('hide')) {
      btnPlay.classList.remove('hide')
    } else {
      btnPlay.classList.add('hide')
    }
    //Añade al elemento btnPlay otra clase css de las que ya posee (hide))
  }

  /*Función que genera una nueva secuencia para cada objeto*/
  createSequence() {
    this.sequence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  /*'nextLevel' llama a 'lightSequence'. Cada vez que se llegue a un nuevo nivel, se va a iluminar la secuencia.
  También llama a dddEventClick que se encargará de reconocer si las opciones seleccionadaspor el usuario son las correctas o no*/
  nextLevel() {
    this.sublevel = 0
    this.lightSequence()
    this.addEventClick() 
  }

  changeNumberToColor(number){
    switch (number){
      case 0:
        return 'blue'
      case 1: 
        return 'yellow'
      case 2:
        return 'green'
      case 3: 
        return 'red'
    }
  }//este metodo transforma un número a un color. Para que pueda funcionar con this.sequence

  changeColorToNumber(color){
    switch (color){
      case 'blue':
        return 0
      case 'yellow': 
        return 1
      case 'green':
        return 2
      case 'red': 
        return 3
    }
  }// este método hace es el que se llamará según el input del usuario, por eso es al revés

  lightSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.changeNumberToColor(this.sequence[i])
      setTimeout(() => this.turnOnColor(color), 1000 * i) // De esta forma no se ilumina todo de una vez sino que se ilumina con un segundo de diferencia 
    }
  } //este método recorre el array de la secuencia (this.sequence) hasta el nivel en el que esté el usuario

  turnOnColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOffColor(color), 350)
  }

  turnOffColor(color) {
    this.colors[color].classList.remove('light')
  }

  addEventClick() {
    this.colors.blue.addEventListener('click', this.pickColor)
    this.colors.yellow.addEventListener('click', this.pickColor)
    this.colors.green.addEventListener('click', this.pickColor)
    this.colors.red.addEventListener('click', this.pickColor)
  }//se ejecutará asincronamente porque se ejecutará cuando JS se quede sin tareas

  deleteEventClick() {
    this.colors.blue.removeEventListener('click', this.pickColor)
    this.colors.yellow.removeEventListener('click', this.pickColor)
    this.colors.green.removeEventListener('click', this.pickColor)
    this.colors.red.removeEventListener('click', this.pickColor)
  }

  pickColor(ev) {
    const colorName = ev.target.dataset.color
    const colorNumber = this.changeColorToNumber(colorName)
    this.turnOnColor(colorName)
    if (colorNumber === this.sequence[this.sublevel]) {
      this.sublevel++
      if (this.sublevel === this.level) {
        this.level++
        this.deleteEventClick()
        if (this.level === (FINAL_LEVEL + 1)) {
          this.winGame()
        } else {
          setTimeout(this.nextLevel, 1500)
        }
      }
    } else {
      this.loseGame()
    }
  }//cuando se usan manejadores de eventos (addEL), los metodos se llaman con el parámetro 'ev' que da las especificaciones del click

  winGame(){
    swal('Simon Says','Congrats! You won the game.', 'success')
    .then(() => {
      this.initialize()
    })
  }

  loseGame(){
    swal('Simon Says','Sorry :(, you lost the game. Try again!', 'error')
    .then(() => {
      this.deleteEventClick()
    })
  }
}

function startGame() {
  window.game = new Game()
}