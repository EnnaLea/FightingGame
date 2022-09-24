const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//creiamo un rettangolo dove si svolgerà il gioco
c.fillRect(0, 0, canvas.width, canvas.height);

//fornisce l'accelerazione di caduta dell'oggetto
const gravity = 0.7

// creazione oggetto sprite
class Sprite{
    constructor({ position, velocity }){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;

        //costante per salvare l'ultimo pulsante premuto risolvendo il problema dell'overriding la direzione del player con i tasti
        this.lastKey

        //per gli attacchi
        this.attackBox = {
            position: this.position ,
            width: 100,
            height:50
        }
    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);

        //attack box
    }

    //metodo per muovere gli oggetti
    update(){
        this.draw();

        this.position.x += this.velocity.x;
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

//imposto una costante per il movimento tramite la pressione dei tasti
const keys = {
    a:{
        pressed: false
    },
    d: {
        pressed: false
    },
   w: {
    pressed: false
   },
   ArrowRight: {
    pressed: false
   },
    ArrowLeft: {
        pressed: false
    },
    
}


//creazione animation loop
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

}

animate();

// move characters with eventListeners

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch(event.key){

        //player keys
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd'
        break
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a'
        break
        case 'w':
            player.velocity.y = -20
        break

        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break  
    }

})

window.addEventListener('keyup', (event) => {
    switch (event.key) {

        //player keys
        case 'd':
            keys.d.pressed = false;
        break
        case 'a':
            keys.a.pressed = false;
        break
        case 'w':
            player.velocity.y = -10;
            break

        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break          
    }   

})

//creazione attacchi
