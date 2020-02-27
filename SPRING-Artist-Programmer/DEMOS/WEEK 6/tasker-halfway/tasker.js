// Don't execute any JavaScript until the entire webpage is loaded
$(document).ready(function(){

  // let input = document.getElementById("special");
  //
  // console.log("jquery:", $input )
  // console.log("vanilla js:", input )

  let $input = $('input');
  let $newTaskButton = $('button#new-task');

  // Create an event listener for a click
  $newTaskButton.on('click', function(){
    // Whenever someone clicks the button, do something cool

    let $inputValue = $input.val();
    addTask( $inputValue );
    $input.val('');

  });

  // input is a parameter
  function addTask( ) {
    // Take the input from the user
    // Create a list item that includes the input
    // And then add that element to the front end DOM
    let $newItem = $( `<li class="task">${ input }</li>` );
    // let $newItem = $('<li class="task">' + input + '</li>');
    if( input === '' ) {
      alert("You didn't enter anything...")
    } else {
      $('ul').append( $newItem );
    }

  }

});
