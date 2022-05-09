const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
// mouse
let mouse = {
    x: null,
    y: null,
    radius: 100
}
window.addEventListener('mousemove', 
function(event){
    mouse.x = event.x +canvas.clientLeft/2;
    mouse.y = event.y +canvas.clientTop/2;
});


function drawImage(){
    let imageWidth = png.width;
    let imageHeight = png.height;
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0,0,canvas.width, canvas.height);

    class Particle {
        constructor(x, y, color, size){
            this.x = x + canvas.width/2 - png.width * 2,
            this.y = y + canvas.height/2 - png.height * 2,
            this.color = color,
            this.size = 2,
            this.baseX = x + canvas.width/2 - png.width * 2,
            this.baseY = y + canvas.height/2 - png.height * 2,
            this.density = (Math.random() * 10) + 2;
        }
        draw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update(){
            ctx.fillStyle = this.color;

            //collision detection
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;

            //max distance, past that the force will be 0
            const maxDistance = 100;
            let force = (maxDistance - distance) / maxDistance;
            if (force < 0) force = 0;

            let dircetionX = (forceDirectionX * force * this.density * 0.6);
            let dircetionY = (forceDirectionY * force * this.density * 0.6);

            if (distance < mouse.radius + this.size) {
                this.x -= dircetionX;
                this.y -= dircetionY;
            } else {
                if (this.x !== this.baseX){
                    let dx = this.x - this.baseX;
                    this.x -= dx/20;
                } if (this.y !== this.baseY){
                    let dy = this.y - this.baseY;
                    this.y -= dy/20;
                }
            }
            this.draw()
        }
    }
    function init() {
        particleArray = [];
        for (let y = 0, y2 = data.height; y < y2; y++){
            for(let x = 0, x2 = data.width; x < x2; x++){
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x;
                    let positionY = y;
                    let color = "rgb(" + data.data[(y * 4 * data.width) + (x * 4)] + "," +
                                        data.data[(y * 4 * data.width) + (x * 4) + 1] + "," +
                                        data.data[(y * 4 * data.width) + (x * 4) + 2] + ")";
                    particleArray.push(new Particle(positionX * 4, positionY * 4, color));
                }
            }
        }
    }
    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(255,255,255,0';
        ctx.fillRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }
    init();
    animate();

    window.addEventListener('resize', 
        function() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            init();
    });
}

const png = new Image(); 
png.src = "data:image/png;base64,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"
window.addEventListener('load', (event) => {
    ctx.drawImage(png, 0, 0);
    drawImage();
})