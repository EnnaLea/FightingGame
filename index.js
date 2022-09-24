const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//creiamo un rettangolo dove si svolgerà il gioco
c.fillRect(0, 0, canvas.width, canvas.height);

//fornisce l'accelerazione di caduta dell'oggetto
const gravity = 0.2

// creazione oggetto sprite
class Sprite{
    constructor({ position, velocity }){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    //metodo per muovere gli oggetti
    update(){
        this.draw();
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
}

//creazione player
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0

    }
});


//creazione enemy
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
    
});


console.log(player);

//creazione animation loop
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
}

animate();

// mive characters with eventListeners

window.addEventListener('keydown', (event) => {
    console.log(event.key);

})