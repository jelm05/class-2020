$(document).ready(function(){

  // This is where we're going to store all of our tasks
  let taskList = [];

  let $input = $('input#input-task');
  let $newTaskButton = $('button#new-task');


  // Enter task on pressing enter
  $input.keypress( function( event ){

    if( event.which == 13 ){
      let $inputValue = $input.val();
      let taskID = uniqueId();
      addTask( $inputValue, taskID );
    }

  });


  // Add a task on click of new task button
  $newTaskButton.on('click', function(){
    let $inputValue = $input.val();
    let taskID = uniqueId();
    addTask( $inputValue, taskID );
  });

  // Check tasks completed
  $('ul').on('click', 'li', function(){

    $(this).toggleClass('checked');
    let $taskID = $(this).attr('data-id');

    let taskStatus = taskList.find( function( task ){
      return task.id === $taskID;
    });

    if( taskStatus.completed === false ) {
      taskStatus.completed = true;
    } else {
      taskStatus.completed = false;
    }

  });

  // Mark all tasks complete
  $('button#mark-all').on('click', function(){

    $('li.task').each(function(){

      taskList.find( function( task ){
        task.completed = true;
      });

      // Find everything that doesn't have a class of 'checked'
      // and then add that class
      let $theClass = !$(this).hasClass("checked");
      if( $theClass === true ) {
        $('li.task').addClass('checked');
      }

    });
  });


  // Delete all tasks
  $('button#delete-completed').on('click', function(){

    if( confirm('Are you sure you want to delete this task?') ) {
      $('li.checked').remove();
    }

  });


  // Unique ID
  function uniqueId() {
    return Math.random().toString(36).substr(2,9);
  }

  // Add task function
  function addTask( inputValue, taskID ) {

    let taskObject = {
      id: taskID,
      content: inputValue,
      completed: false
    }

    let $newTask = $( `<li data-id="${ taskID }" class="task">${ inputValue }</li>` );
    let $taskContainer = $('#task-container > ul');

    if ( inputValue === '' ) {
      alert("You didn't enter a task.")
    } else {
      taskList.push( taskObject );
      $taskContainer.append( $newTask );
      $input.val('');
    }

  }


});
