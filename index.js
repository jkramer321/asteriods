//accessing the canvas element
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//changing the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Player{
    constructor({position,velocity}){
        this.position = position; // {x, y}
        this.velocity = velocity;
        this.rotation = 0;
    }
    
    //creating draw code
    draw(){

        ctx.save();
        //rotation of the player
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.translate(-this.position.x, -this.position.y);

        //checking if it is in the center
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI*2, false);
        ctx.fillStyle = 'purple';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        //moving to to draw
        
        ctx.moveTo(this.position.x+30, this.position.y);
        //drawing a line
        ctx.lineTo(this.position.x-10, this.position.y-10);
        ctx.lineTo(this.position.x-10, this.position.y+10);
        //closes the path 
        ctx.closePath();

        //get the outline
        ctx.strokeStyle = 'white';
        ctx.stroke();

        ctx.restore();
    }

    update(){
        this.draw();
    
        // Check if player touches the border
        if (this.position.x + 30 > canvas.width) {
            this.position.x = canvas.width - 30;
            this.velocity.x *= -friction;
        } else if (this.position.x - 30 < 0) {
            this.position.x = 30;
            this.velocity.x *= -friction;
        }
    
        if (this.position.y + 30 > canvas.height) {
            this.position.y = canvas.height - 30;
            this.velocity.y *= -friction;
        } else if (this.position.y - 30 < 0) {
            this.position.y = 30;
            this.velocity.y *= -friction;
        }
    
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    getVertices() {
        const cos = Math.cos(this.rotation)
        const sin = Math.sin(this.rotation)
    
        return [
          {
            x: this.position.x + cos * 30 - sin * 0,
            y: this.position.y + sin * 30 + cos * 0,
          },
          {
            x: this.position.x + cos * -10 - sin * 10,
            y: this.position.y + sin * -10 + cos * 10,
          },
          {
            x: this.position.x + cos * -10 - sin * -10,
            y: this.position.y + sin * -10 + cos * -10,
          },
        ]
      }

    
    }

//projectiles class
class Projectile{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 5;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
};

//making a new player 
const player = new Player({
    position:{x: (canvas.width)/2, y: canvas.height/2}, 
    velocity:{x: 0, y: 0},
});

// player.draw();

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    d:{
        pressed: false
    }

}

//constants
const speed = 3;
const rotSpeed = 0.05;
const friction = .97;
const fireRate = 5;
//arrays for constants
const projectiles = [];
const asteroids = [];

//defining the score
let score = 0;






//asteriod class
class Asteriod{
    constructor({position, velocity, radius}){
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        //going to be outline
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
};

//default speed multiplier
let asteroidSpeedMultiplier =1;
let intervalId;
let asteroidInterval = 3000;

//spawning asteroids
function spawnAsteroids(){
    //clearing the interval
    clearInterval(intervalId);

    //setting the interval
    intervalId = setInterval(()=>{
    const index = Math.floor(Math.random() * 4);
    let x,y; 
    let vx, vy
    let radius = 50 * Math.random() + 10;

    switch (index){
        //left side of the screen
        case 0: 
            x = 0 -radius;
            y = Math.random() * canvas.height;
            vx = (Math.random() * 2 + 1) * asteroidSpeedMultiplier; // random velocity between 1 and 3
            vy = (Math.random() * 2 - 1) * asteroidSpeedMultiplier; // random velocity between -1 and 1
            break;

        //bottom
        case 1:
            x = Math.random() * canvas.width;
            y = canvas.height + radius;
            vx= (Math.random() * 2 - 1) * asteroidSpeedMultiplier; // random velocity between -1 and 1
            vy= (Math.random() * -2 - 1)* asteroidSpeedMultiplier; // random velocity between -1 and -3
            break;
        
        //right
        case 2:
            x = canvas.width + radius;
            y = Math.random() * canvas.height;
            vx= (Math.random() * -2 - 1) * asteroidSpeedMultiplier; // random velocity between -1 and -3
            vy= (Math.random() * 2 - 1) * asteroidSpeedMultiplier; // random velocity between -1 and 1
            break;

        //top
        case 3:
            x= Math.random()* canvas.width;
            y = 0 - radius;
            vx= (Math.random() * 2 - 1) * asteroidSpeedMultiplier; // random velocity between -1 and 1
            vy = (Math.random() * 2 + 1) * asteroidSpeedMultiplier; // random velocity between 1 and 3
            break;
    }
    asteroids.push(new Asteriod({
        position:{x ,y},
        velocity:{
            x: vx,
            y: vy,
        },
        radius,
    
    }));
    }, asteroidInterval);
}


//start spawning asteroids
spawnAsteroids();


//asteroid speed multiplier
document.addEventListener('DOMContentLoaded', () => {
    //double speed button
    document.getElementById('doubleSpeed').addEventListener('click', () =>{
        //limiting the max speed
        if(asteroidSpeedMultiplier < 4){
            //multiply the speed by 2
            asteroidSpeedMultiplier *=2;
            //halve the interval time
            asteroidInterval /=2;
            //logging message to the console
            console.log(`Speed Multiplier: ${asteroidSpeedMultiplier}`);
            console.log(`Interval: ${asteroidInterval / 1000 } seconds`);
        }else{
            console.log('Speed is already at the maximum');
        }
    })
    //half speed button 
    document.getElementById('halfSpeed').addEventListener('click', ()=>{
        //limiting the min speed
        if(asteroidSpeedMultiplier > .25){
            //halve the speed
            asteroidSpeedMultiplier /=2;
            //logging a message to the console
            console.log(`Speed Multiplier: ${asteroidSpeedMultiplier}`);
            //if the interval is less than 3 seconds
            if(asteroidInterval < 3000) {
                asteroidInterval *=2;
                console.log(`Interval: ${asteroidInterval / 1000} seconds`);
            }
        }else{
            console.log('Speed is already at the minimum');
        }
    })

    //reset speed button
    document.getElementById('resetSpeed').addEventListener('click', ()=>{
        //reset the speed
        asteroidSpeedMultiplier = 1;
        //logging a message to the console
        console.log(`Speed Multiplier: ${asteroidSpeedMultiplier}`);

    });
});




//collision
function circleCollision(circle1, circle2){
    const xDifference = circle2.position.x - circle1.position.x;
    const yDifference = circle2.position.y - circle1.position.y;

    const distance = Math.sqrt(xDifference * xDifference + yDifference * yDifference);

    if (distance <= circle1.radius + circle2.radius){
        return true;
    }
    return false;
}
function circleTriangleCollision(circle, triangle) {
    // Check if the circle is colliding with any of the triangle's edges
    for (let i = 0; i < 3; i++) {
      let start = triangle[i]
      let end = triangle[(i + 1) % 3]
  
      let dx = end.x - start.x
      let dy = end.y - start.y
      let length = Math.sqrt(dx * dx + dy * dy)
  
      let dot =
        ((circle.position.x - start.x) * dx +
          (circle.position.y - start.y) * dy) /
        Math.pow(length, 2)
  
      let closestX = start.x + dot * dx
      let closestY = start.y + dot * dy
  
      if (!isPointOnLineSegment(closestX, closestY, start, end)) {
        closestX = closestX < start.x ? start.x : end.x
        closestY = closestY < start.y ? start.y : end.y
      }
  
      dx = closestX - circle.position.x
      dy = closestY - circle.position.y
  
      let distance = Math.sqrt(dx * dx + dy * dy)
  
      if (distance <= circle.radius) {
        return true
      }
    }
  
    // No collision
    return false
  }
  
  function isPointOnLineSegment(x, y, start, end) {
    return (
      x >= Math.min(start.x, end.x) &&
      x <= Math.max(start.x, end.x) &&
      y >= Math.min(start.y, end.y) &&
      y <= Math.max(start.y, end.y)
    )
  }


//animating movement
function animate(){
    //recusively calling the animate function
    const animationId = window.requestAnimationFrame(animate);
    //clearing the canvas
    ctx.fillStyle='black';
    //creating a rectangle
    ctx.fillRect(0,0, canvas.width, canvas.height);
    //updating the player
    player.update();

    //displaying the score in the top left corner
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10 ,30);

    //displaying the high score in the top right corner
    const highScore = localStorage.getItem('highScore') || 0;
    ctx.fillText(`High Score: ${highScore}`, canvas.width - 200, 30);

    //to render out the projectiles
    for(let i = 0; i < projectiles.length; i++){
        projectiles[i].update();

        if( projectiles[i].position.x > canvas.width 
            || projectiles[i].position.x < 0 
            || projectiles[i].position.y > canvas.height 
            || projectiles[i].position.y < 0){
                //get rid of the projectile
                projectiles.splice(i, 1);
        }

    }


    //asteroid management
    for(let i = asteroids.length -1; i >= 0; i--){
        const asteriod = asteroids[i];
        asteriod.update();

        if(circleTriangleCollision(asteriod, player.getVertices())){
            console.log('Game Over');
            //check and update the high score
            const highScore = localStorage.getItem('highScore') || 0;
            if(score > highScore){
                //update the high score
                localStorage.setItem('highScore', score);
                //printing a message
                console.log('New High Score!!!');
            }
            // Store score
            localStorage.setItem('finalScore', score); 
            //logging the game over score
            console.log('Game Over');
            window.cancelAnimationFrame(animationId);
            clearInterval(intervalId);
            window.location.href = 'gameover.html';
        }


        
        //checking if the asteroid is out of bounds
        if(
            asteriod.position.x + asteriod.radius < 0 ||
            asteriod.position.x - asteriod.radius > canvas.width ||
            asteriod.position.y +asteriod.radius <0 ||
            asteriod.position.y - asteriod.radius > canvas.height
        ){
            asteroids.splice(i,1);
        }

        //for projectiles
        for (let j = projectiles.length -1; j>=0; j--){
            const projectile = projectiles[j];

            if(circleCollision(asteriod, projectile)){
                //get rid of the projectile
                projectiles.splice(j,1);
                //get rid of the asteroid
                asteroids.splice(i,1);

                //update the score
                score +=1;
                console.log(`Score: ${score}`);
            }
        }


    }


    //if the key isn't pressed
    // player.velocity.x = 0;
    // player.velocity.y = 0;

    //updazting velocity
    if (keys.w.pressed) {
        player.velocity.x = Math.cos(player.rotation) * speed ;
        player.velocity.y = Math.sin(player.rotation) * speed ;
    } else if (!keys.w.pressed){
        player.velocity.x *= friction;
        player.velocity.y *= friction;
    }

    //rotate right
    if(keys.d.pressed) player.rotation += rotSpeed;
    //rotate left
    else if (keys.a.pressed) player.rotation -= rotSpeed;
}

//calling the animate function
animate()

//when key pressed
window.addEventListener('keydown', (event)=>{
    //Ignore keydown events on buttons
    if (event.target.tagName === 'BUTTON') {
        return;
    }
    switch(event.code){
        //moving up
        case 'KeyW':
            keys.w.pressed = true;
            break;
        
        //moving right
        case 'KeyD':
            keys.d.pressed = true;
            break;

        //moving left
        case 'KeyA':
            keys.a.pressed = true;
            break;
        
        //shooting
        case 'Space':
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x+ Math.cos(player.rotation) * 30,
                    y: player.position.y + Math.sin(player.rotation) * 30,
                },
                velocity:{
                    x: Math.cos(player.rotation) * fireRate,
                    y: Math.sin(player.rotation) * fireRate,
                }
            })
        )
        
        
    }


});
//when the key is released
window.addEventListener('keyup', (event)=>{
    switch(event.code){
        //moving up
        case 'KeyW':
            keys.w.pressed = false;
            break;
        
        //moving right
        case 'KeyD':
            keys.d.pressed = false;
            break;

        //moving left
        case 'KeyA':

            keys.a.pressed = false;
            break;

    }


});

