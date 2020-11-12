$(document).ready(function(){

  var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      particles = {},
      particleIndex = 0,
      particleNum = 10;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Set up our canvas
      ctx.fillStyle = "black";
      ctx.fillRect( 0, 0, canvas.width, canvas.height );


      // Use a constructor function to be able constantly re-draw a Particle
      function Particle() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;

        particleIndex++
        particles[ particleIndex ] = this;

        this.id = particleIndex;
        this.life = 0;
        // this.death = 200;
        this.death = 100;

        var degrees = parseInt( Math.random() * 360 );
        this.color = "hsl(" + degrees + ", 80%, 50%";

      }

      Particle.prototype.draw = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++

        if (this.life > this.death ) {
          delete particles[ this.id ];

          // console.log( this.id );
          // particles = {};
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        // x, y, radius, startpoint, endpoint, direction in degrees (Math.PI*2 = 360)
        ctx.arc( this.x, this.y, 9, 0, Math.PI * 2, false );
        ctx.fill();

        if ( this.y > canvas.height ) {
            this.vy *= -1;
            this.vx *= 0.2;
            // this.y = 450;
        }

        if ( this.x > canvas.width ) {
            this.vx *= -1;
            this.vy *= 0.2;
            // this.x = 450;
        }

        if ( this.y < 10 ) {
            this.vy *= -1;
            this.vx *= 0.2;
            // this.y = 450;
        }

        if ( this.x < 10 ) {
            this.vx *= -1;
            this.vy *= 0.2;
            // this.x = 450;
        }


      }

      function drawTheParticles() {

        for (var i = 0; i < particleNum; i++) {
          new Particle();
        }

        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var i in particles) {
            particles[i].draw();
        }

      }

      setInterval( function(){
        drawTheParticles()
      }, 30);

      // console.log(particles);

});
