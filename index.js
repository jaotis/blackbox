const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1500;
canvas.height = 720;

const gravity = 0.5;

class Player {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 100
        this.width = 100    
    }
    
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        let inAir = false;
        this.draw();

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x


        if (this.position.y + this.height + this.velocity.y < canvas.height){
            this.velocity.y += gravity;
            inAir = true;
            if (this.position.y + this.velocity.y < 0) this.velocity.y = 0;
        }
        else this.velocity.y = 0;

        if (keys.w.pressed && inAir == false) this.velocity.y = -35;
        
        this.velocity.x = 0;
        if (keys.d.pressed && this.position.x + this.width + this.velocity.x < canvas.width) this.velocity.x = 20
        else if (keys.a.pressed && this.position.x + this.velocity.x > 0) this.velocity.x = -20
    }
}

const player = new Player({
    position:{
        x: 0, 
        y: 0
    },
    velocity:{
        x: 0,
        y: 1
    },
})

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
}

animate()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w':
            keys.w.pressed = true;
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
    }
})
