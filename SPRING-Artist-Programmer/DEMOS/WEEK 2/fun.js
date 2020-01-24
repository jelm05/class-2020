
// We always want to wait to execute our JS code
// until AFTER the DOM/browser is loaded

// jQuery, look at the document, when it's ready, run a function
// $(document) is an object, .ready() is a method on that object
$(document).ready(function(){
  // Put a message in the console of the browser
  // Console is an object, .log() is a method on that object
  console.log("I'm ready!");

  // Create a variable called $box
  // so that we can store, in memory
  // all of the divs, with a class of box
  let $box = $("div.box");

  // Okay jQuery, LISTEN for any CLICK EVENT
  // on a html element called $box
  $box.click(function(){
    // alert("You clicked the box!");
    $box.animate({ height : "700px" });
  });

});
