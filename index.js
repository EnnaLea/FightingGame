const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//creiamo un rettangolo dove si svolgerà il gioco
c.fillRect(0, 0, canvas.width, canvas.height);

// creazione players

// creazione oggetto sprite
class Sprite{
    constructor(position){
        this.position = position;
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, 150);
    }
}

//creazione player
const player = new Sprite({
    x:0,
    y:0
});

player.draw();

//creazione enemy
const enemy = new Sprite({
    x:400,
    y:100
});

enemy.draw();

console.log(player);

//creazione animation loop
