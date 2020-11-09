
// This means: jQuery, don't attempt to execute any JavaScript
// until the browser is fully loaded
$(document).ready(function() {

  // This is where we're going to store all of our tasks
  // In the real world, this would probably be a database
  let taskList = [];

  // const $newTaskButton = $('button#new-task');

  // The new task button and the keypress event essentialyl do the same thing
  // So, we should combine those into one function we can recall
  $('button#new-task').on('click', function(){
    let $inputVal = $('input').val();
    let taskID = uniqueID();
    addTask($inputVal, taskID);

    // Look at input after adding the new task, and replace content with nothing
    $('input').val('');
  });

  $('input').keypress(function(event) {
    // The enter key's keycode is 13
    console.log(event.which)
    if( event.which == 13 ) {
      let $inputVal = $('input').val();
      let taskID = uniqueID();
      addTask($inputVal, taskID);
      $('input').val('');
    }
  });

  $('ul').on('click', 'li', function(){
    // $(this) references the object that the event is being called upon
    $(this).toggleClass('checked');

    let $taskID = $(this).attr('id')

    // Look at the array that's storing our tasks,
    // and find any taskItem that has an ID that matches
    // the ID of <li> that we just clicked on
    let taskStatus = taskList.find( function(taskItem) {
      // console.log("li ID", $taskID)
      // console.log("array task id", taskItem.id)
      return taskItem.id === $taskID
    });

    if ( taskStatus.completed === false ) {
      taskStatus.completed = true;
    } else {
      taskStatus.completed = false;
    }

  });

  $('button#mark-all').on('click', function(){

    // We're only marking the task checked/completed on the front end,
    // We haven't updated the taskList

    // Look at all existing tasks and iterate over them
    $('li.task').each(function(){
      $(this).addClass('checked');
    });

  });

  $('button#delete-completed').on('click', function(){
    if( confirm("Are you sure?") ) {
      $('li.checked').remove();
    }
  });

  function uniqueID(){
    // this returns a random string of 7 characters
    return Math.random().toString(36).substr(2, 9);
  }

  function addTask(input, taskID) {

    if (input === '') {
      alert("You didn't enter a task!");
    } else {

      let taskObject = {
        id : taskID,
        content : input,
        completed : false
      }

      taskList.push(taskObject);

      let $newTask = $(`<li id=${taskID} class="task">${input}</li>`);
      $('ul').append( $newTask );
    }

  }

});
