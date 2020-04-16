$(document).ready(function() {

  let $player = $("#player");
  let keys = {};
  const floor = 800;

  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;


  $(document).keydown(function( event ) {
    // console.log( event.which );
    keys[ event.which ] = true;
    console.log( keys )
  }).keyup(function( event ) {
    keys[ event.which ] = false;
    console.log( keys )
  });


  function Player() {
    this.x = 200;
    this.y = 200;
    this.vx = 0;
    this.vy = 0;
    this.isOnFloor = false;
  }

  // Keeps track of the speed of our character
  Player.prototype.keys = function() {

    if( keys[LEFT] ) {
      this.vx -= 2;
    }

    if( keys[UP] ) {
      if( this.isOnFloor ) {
        this.vy = -25;
      }
    }

    if( keys[RIGHT] ) {
      this.vx += 2;
    }

  };

  Player.prototype.run = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.isOnFloor = false;

    // console.log(this.vx)
    // console.log(this.vy)

    // We're creating walls here
    // Left wall
    if ( this.x < 10 ) {
      this.x = 10;

    // Right wall
  } else if ( this.x > 800 ) {
      this.x = 800;
    }

    if( this.y > floor ) {
      this.y = floor;
      this.isOnFloor = true;
    }

    this.vx *= 0.8;
    this.vy += 2;
    this.keys();

    $player.css({
      left: this.x,
      top: this.y
    });

  };

  let p = new Player();
  setInterval( function() {
    p.run();
  }, 30);


});
