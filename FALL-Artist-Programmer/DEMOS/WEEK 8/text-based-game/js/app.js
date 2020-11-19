$(document).ready(function(){

  const $text = $('div#text > p');
  const $storyOptions = $('div#story-options');

  let state = {};

  function startGame() {
    state = {};
    showPathChoice(1);
  }

  function showPathChoice(pathChoiceId) {

    // Find the correct storyline path
    // according ot hte corresponding ID
    let pathChoice = storylines.find( function(path) {
      return path.id === pathChoiceId;
    });

    // Update the text according to the matching path choice
    $text.text(pathChoice.text);

    // Clear out old buttons
    $storyOptions.empty();

    pathChoice.options.forEach(function(option) {

      // The if statement checks the state, reference function below
      if( showOptions(option) ) {

        let $button = $('<button/>',
          {
              text: option.text,
              class: 'btn',
              click: function() { selectOption(option) }
          }
        );

        $storyOptions.append($button);

      }

    });

  }

  function selectOption(option) {
    let pathId = option.nextPath;

    // Check if you died and restart
    if( pathId <= 0 ) {
      return startGame();
    }

    state = Object.assign(state, option.setState)
    // Where are we going next?
    showPathChoice(pathId);
  }

  // Check if there's a required state and render buttons accordingly
  // Required state is within the storylines array
  function showOptions(option) {
    console.log("showOptions", state)
    // Is there a require state object?
    return option.requiredState == null || option.requiredState(state)
  }

  startGame();

});
