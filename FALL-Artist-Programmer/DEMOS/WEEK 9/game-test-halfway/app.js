$(document).ready(function() {

  const $doc = $(document);
  const $world = $("#world");
  const floor = 380;
  const gravity = 1;

  let mainLoop;

  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  let keys = {};
  $doc.keydown(function(event){
    keys[event.which] = true;
  }).keyup(function(event){
    keys[event.which] = false;
  });

  beginGame();

  function createProjectile() {
    // Create projectile object to be update and used
    let projectile = {
      x: $world.width() + 50,
      y: Math.random() * ( $world.height() - 40 ),
      vx: Math.random() * -10 - 5
    };

    // Use the object to render a div on the DOM
    projectile.div = $("<div>", {
      css: {
        left: projectile.x,
        top: projectile.y
      }
    }).appendTo($world);

    // Set the width of our projectile
    projectile.width = projectile.div.width();

    // Update the position of our projectilse
    projectile.update = function() {
      projectile.x += projectile.vx;

      // If the projectile goes off screen
      if ( projectile.x < -projectile.width ) {
        projectile.remove();
      }

      // This applies our manipulated valuse to the front end
      projectile.div.css({
        top: projectile.y,
        left: projectile.x
      });

    };

    let enemyLoop = setInterval(projectile.update, 30);

    projectile.remove = function() {
      clearInterval(enemyLoop);
      projectile.div.remove();
    }

    projectile.hit = function() {
      projectile.remove();
    }

    return projectile;

  }

  function createEnemy() {
    let enemy = createProjectile();
    enemy.div.attr("class", "enemy");
    enemy.hit = function() {
      enemy.remove();
      character.hit();
    }
  }

  // All properties, values, and methods for our character
  // should be attached to our character
  let character = {
    x: 30,
    y: 200,
    vx: 0,
    vy: 0,

    reset: function() {

    },
    init: function() {
      this.div = $("<div>", {
        "id": "char",
        css: {
          left: this.x,
          top: this.y
        }
      }).appendTo($world);
      this.ground = floor - this.div.height();
      this.right = $world.width() - this.div.width();
    },
    hit: function() {
      console.log("hit");
    },
    update: function() {
      this.x += this.vx;
      this.y += this.vy;
      this.isOnGround = false;

      // Ground
      if ( this.y > this.ground ) {
        this.y = this.ground;
        this.isOnGround = true;
      }

      // Left
      if (this.x < 0) {
        this.x = 0;
        this.vx = 0;
      }

      // Right
      if ( this.x > this.right ) {
        this.x = this.right;
        this.vx = 0;
      }

      // Speed
      // If we simply used += our character would run off screen
      this.vx *= 0.9;
      // How fast will our character fall?
      this.vy += gravity;

      // This actually assigns the x and y values to the character
      // on the front end that we've been manipulating above
      this.div.css({
        top: this.y,
        left: this.x
      });

      this.keyCapture();

    },
    keyCapture: function() {

      if (keys[LEFT]) {
        character.vx -= 2;
      }

      if (keys[RIGHT]) {
        character.vx += 2;
      }

      if (keys[UP] && character.isOnGround) {
        character.vy = -20;
      }

      if (keys[DOWN]) {
        character.vy += 2;
      }

    }
  };

  function runGame() {
    // console.log("run game")
    character.update();

    if( Math.random() < 0.1 ) {
      createEnemy();
    }

  }

  function beginGame() {
    $doc.one("click", function(){
      $("#startGame").hide();
      character.init();
      clearInterval(mainLoop);
      mainLoop = setInterval(runGame, 30);
    });
  }


});
