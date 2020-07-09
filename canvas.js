const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const mouse = {
    x: null,
    y: null
}

const maxRadius = 40;

const colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#349808',
    '#298089'
]

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', e => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        if (this.x + radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50
            && mouse.x - this.x > -50
            && mouse.y - this.y < 50
            && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}


let circleArray = [];

function init() {

    circleArray = [];

    for (let i = 0; i < 1000; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    circleArray.forEach(circle => {
        circle.update();
    })

}

init();
animate();
