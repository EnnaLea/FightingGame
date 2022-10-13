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
    constructor({ position, velocity, color = 'red', offset }){
        this.position = position;
        this.velocity = velocity;
        this.width = 50
        this.height = 150;

        //costante per salvare l'ultimo pulsante premuto risolvendo il problema dell'overriding la direzione del player con i tasti
        this.lastKey

        //per gli attacchi
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height:50
        }
        this.color = color;
        this.isAttacking;
        this.health = 100;
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        //attack box
        if(this.isAttacking){
            c.fillStyle = 'green'
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }
        
    }

    //metodo per muovere gli oggetti
    update(){
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
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

    },
    offset: {
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
    },
    color: 'blue',
    offset: {
        x: -50,
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

function rectangularCollision ({
    rectangle1,
    rectangle2
}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

//funzione timer 
let timer = 5
function decreaseTimer(){
    
    if(timer > 0){
        setTimeout(decreaseTimer, 1000)
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    } 


    if (timer === 0) {
        if (player.health === enemy.health) {
            document.querySelector('#displayText').innerHTML = 'Tie';

            document.querySelector('#displayText').style.display = 'flex';

        }

    }
    
}

decreaseTimer();



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

    //percepire la collisione
    if(
       rectangularCollision({
        rectangle1: player,
        rectangle2: enemy

       }) &&
        player.isAttacking
        ) {
        player.isAttacking = false;   
        enemy.health -= 20; 
        document.querySelector("#enemy-hp").style.width = enemy.health + "%";
    }

    if(
       rectangularCollision({
        rectangle1: enemy,
        rectangle2: player

       }) &&
        enemy.isAttacking
        ) {
        enemy.isAttacking = false; 
        player.health -= 20;   
        document.querySelector("#player-hp").style.width = player.health + "%";
    }
}

animate();

// move characters with eventListeners

window.addEventListener('keydown', (event) => {
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
        case ' ':
            player.attack();            
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
        case 'ArrowDown':
            enemy.isAttacking = true
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

//interfaccia healthbar
