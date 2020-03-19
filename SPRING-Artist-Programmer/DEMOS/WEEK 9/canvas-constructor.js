

$(document).ready(function(){

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.fillRect( 0, 0, canvas.width, canvas.height );

  let particleNum = 10;
  let particles = {};
  let particleIndex = 0;

  function Particle() {
    // All particles are starting in the center
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    // The speed of our particles
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;

    particleIndex++;
    // Reassign "this"
    particles[ particleIndex ] = this;
    this.id = particleIndex;

    this.life = 0;
    this.death = 100;

    // Create a random whole number
    let degrees = parseInt( Math.random() * 360 );
    this.color = `hsl( ${degrees}, 80%, 50% )`;

  }

  Particle.prototype.draw = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;

    if( this.life > this.death ) {
      delete particles[ this.id ];
    }

    ctx.fillStyle = this.color;

    // This actually draws the circle
    ctx.beginPath();
    // x, y, radius, startpoint, endpoint, direction
    ctx.arc( this.x, this.y, 9, 0, Math.PI*2, false );
    ctx.fill();

    // Add physics right here
    // if ( this.x > canvas.width ) {
    //   this.vx += 1;
    // }

  };

  function drawTheParticles() {

    for( let i = 0; i < particleNum; i++ ){
      new Particle();
    }

    ctx.fillStyle = "rgba( 0, 0, 0, 0.1)";
    ctx.fillRect( 0, 0, canvas.width, canvas.height );

    for( var i in particles ) {
      particles[i].draw();
    }

  }

  setInterval(function(){
      drawTheParticles();
    }, 30);

  console.log(particles);

});
