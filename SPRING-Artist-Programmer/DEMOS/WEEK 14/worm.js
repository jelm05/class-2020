$(document).ready(function(){
  console.log("ready!")

  // Store divs here
  let divStorageArray = [];

  // Track the position of the cursor
  let mouseX, mouseY = 0;
  $(document).mousemove(function( event ){
    mouseX = event.pageX;
    mouseY = event.pageY;
    // console.log("x", mouseX)
    // console.log("y", mouseY)
  });

  // Generated 50 divs with a class of ball
  for (var i = 0; i < 50; i++) {
    let $div = $("<div class='ball'>");
    $div.appendTo("body");
    $div.x = 200;
    $div.y = 200;
    divStorageArray.push( $div );
  }

  // console.log( divStorageArray )

  setInterval(function(){
    let currentDiv = divStorageArray[0];
    currentDiv.x += (mouseX - currentDiv.x) / 4;
    currentDiv.y += (mouseY - currentDiv.y) / 4;
    // console.log(currentDiv)

    currentDiv.css({
      webkitTransform: `translate3d(${currentDiv.x}px, ${currentDiv.y}px, 0px)`
    });

    for (var i = 1; i < divStorageArray.length; i++) {

      currentDiv = divStorageArray[i];

      // This code makes each div follow the previous div
      // It's like follow the leader
      let previousDiv = divStorageArray[i-1];

      console.log( currentDiv );
      console.log( previousDiv );

      currentDiv.x += ( previousDiv.x - currentDiv.x) / 4;
      currentDiv.y += ( previousDiv.y - currentDiv.y) / 4;
      currentDiv.css({
          webkitTransform: `translate3d(${currentDiv.x}px, ${currentDiv.y}px, 0px)`
      });

    }

  }, 30);



});
