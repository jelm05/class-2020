$(document).ready(function(){

  const $doc = $(document);
  const $world = $("#world");

  const gravity = 1;
  const floor = 380;

  let pickups = 0;
  let counter = 0;
  let mainLoop;
  let timeLoop;
  let firstPlay = true;

  // Get key presses
  let keys = {};
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  $doc.keydown(function(event){
    keys[event.which] = true;
    // console.log(keys)
  }).keyup(function(event){
    keys[event.which] = false;
    // console.log(keys)
  });

  beginGame();

  // This will give us a base to use for both pickups and enemies
  function createProjectile() {
    let projectile = {
      x: $world.width() + 50,
      y: Math.random() * ( $world.height() - 40),
      vx: Math.random() * -10 - 5
    };

    projectile.div = $("<div>", {
      css: {
        left: projectile.x,
        top: projectile.y
      }
    }).appendTo($world);

    // set width of initial projectile to width of the created div
    projectile.width = projectile.div.width();

    projectile.update = function() {

      projectile.x += projectile.vx;

      if( projectile.x < -projectile.width ) {
        projectile.remove();
      }

      if( collision(projectile.div, character.div) ) {
        // projectile.remove();
        projectile.hit();
      }

      projectile.div.css({
        top: projectile.y,
        left: projectile.x
      });

    };

    let enemyLoop = setInterval(projectile.update, 30);

    projectile.remove = function() {
      clearInterval(enemyLoop);
      projectile.div.remove();
    };

    projectile.hit = function() {
      projectile.remove();
    };

    return projectile;

  }

  function createBasicEnemy() {
    let enemy = createProjectile();
    enemy.div.attr("class", "enemy");
    enemy.hit = function() {
      enemy.remove();
      character.hit();
    };

    enemy.die = function() {
      enemy.remove();
    }

    enemy.div.data("die", enemy.die);

    return enemy;

  }

  function createNewEnemyFromBasicEnemy() {
    let enemy = createBasicEnemy();
    enemy.div.css({
      backgroundColor: "green"
    });
    return enemy;
  }

  function createPickup() {
    let pickup = createProjectile();
    pickup.div.attr("class", "pickup");

    pickup.hit = function() {
      pickup.remove();
      pickups++;
      updatePickups();
    };

    pickup.die = function() {
      pickup.remove();
    };

    pickup.div.data("die", pickup.die);

  }

  // Character contains all properties and functions related to character
  let character = {
    x: 30,
    y: 200,
    vx: 0,
    vy: 0,
    hits: 0,
    reset: function() {
      this.hits = 0;
      updateHits();
      this.x = 30;
      this.y = 200;
      this.vx = 0;
      this.vy = 0;
      this.div.css({ backgroundColor: "black" });
      this.update();
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

      this.hits++;
      if( this.hits >= 3 ) {
        character.div.css({ backgroundColor: "red" });
      }

      updateHits();

      let blinkLoop = setInterval( character.blink, 30 );

      setTimeout( function(){
        character.div.css({ opacity: 1 });
        clearInterval(blinkLoop);

        if( character.hits >= 3 ) {
          gameOver();
        }

      }, 500);

    },
    blink: function() {
      character.div.css({ opacity: 0.1 + Math.random() * 0.5 });
    },
    update: function() {

      this.x += this.vx;
      this.y += this.vy;

      this.isOnGround = false;
      // console.log("one",this.isOnGround)
      if( this.y > this.ground ) {
        this.y = this.ground;
        this.isOnGround = true;
      }

      if ( this.x < 0 ) {
        this.x = 0;
        this.vx = 0;
      }

      if( this.x > this.right ) {
        this.x = this.right;
        this.vx = 0;
      }

      this.vx *= 0.9;
      this.vy += gravity;

      this.div.css({
        top: this.y,
        left: this.x
      });

      this.keyCapture();

    },
    keyCapture: function() {

      if( keys[LEFT]) {
        character.vx -= 2;
      }
      if( keys[RIGHT]) {
        character.vx += 2;
      }
      if( keys[UP] && character.isOnGround ) {
        character.vy = -20;
      }
      if( keys[DOWN]) {
        character.vy += 2;
      }
    }
  };

  function count() {
    counter++;
    updateCounter();
  }

  function updateCounter() {
    $("#time").text(`Time: ${counter}`);
  }

  function updateHits() {
    $("#hits").text(`Hits: ${character.hits}`);
  }

  function updatePickups() {
    $("#pickups").text(`Pickups: ${pickups}`);
  }

  function runGame() {
    character.update();
    // Will add enemies here
    if( Math.random() < 0.025 ) {
      createBasicEnemy();
    }

    if( Math.random() < 0.025 ) {
      createNewEnemyFromBasicEnemy();
    }

    if( Math.random() < 0.025 ) {
      createPickup();
    }

  }

  function beginGame() {
    $doc.one("click", function(){
      $("#startGame").hide();
      $("#gameOver").hide();

      pickups = 0;
      counter = 0;

      updatePickups();
      updateCounter();

      if ( firstPlay ) {
        character.init();
        firstPlay = false;
      } else {
        character.reset();
      }

      clearInterval(mainLoop);
      mainLoop = setInterval(runGame, 30);

      clearInterval(timeLoop);
      timeLoop = setInterval(count, 1000);

    });

  }

  function gameOver() {
    $(".enemy, .pickup").each(function(){
      $(this).data("die")();
    });

    clearInterval(mainLoop);

    $("#gameOver").show();

    beginGame();
  }

  function collision(a, b) {
    let aPos = a.position();
    let bPos = b.position();

    let aLeft = aPos.left;
    let aRight = aPos.left + a.width();
    let aTop = aPos.top;
    let aBottom = aPos.top + a.height();

    let bLeft = bPos.left;
    let bRight = bPos.left + b.width();
    let bTop = bPos.top;
    let bBottom = bPos.top + b.height();

    return !( bLeft > aRight ||
              bRight < aLeft ||
              bTop > aBottom ||
              bBottom < aTop
            );
  }




});
