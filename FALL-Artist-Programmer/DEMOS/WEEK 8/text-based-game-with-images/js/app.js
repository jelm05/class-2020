
// There's a much better way to link files, or what are called modules, via Node.js
// But that's not something we've covered yet

$(document).ready(function(){

  // console.log(storylines)

  const $text = $('div#text > p');
  const $storyOptions = $('div#story-options');

  let state = {};

  function startGame() {
    state = {};
    showPathChoice(1);
  }

  function showPathChoice(pathChoiceId) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    // let pathChoice = storylines.find(path => path.id === pathChoiceId);

    // Get the corresponding path/story
    let pathChoice = storylines.find(function(path){
      return path.id === pathChoiceId
    });

    // console.log("pathChoice", pathChoice)
    // console.log("pathChoice", pathChoice.text)

    // Update image
    $('html').css("background-image", "url(images/" + pathChoice.image + ")" )

    // Update story
    $text.text(pathChoice.text)

    // Need to clear out old buttons here:
    $storyOptions.empty();

    pathChoice.options.forEach(function(option){

      if( showOptions(option) ){

        let $button = $('<button/>',
          {
            text: option.text,
            class: 'btn',
            // click: function() { alert('hi') }
            click: function(){ selectOption(option) }
          }
        );
        $storyOptions.append($button)

      }

    });

  }


  function selectOption(option) {
    let pathId = option.nextPath

    if( pathId <= 0) {
      return startGame();
    }


    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    // Takes current state and add everything from the option.setState property
    // It will also override any of the same properties
    // option.setState takes priority
    // It always returns a new object, that is then assigned to state
    state = Object.assign(state, option.setState)
    showPathChoice(pathId)
  }

  function showOptions(option) {
    // Is there a required state object?
    // OR,
    return option.requiredState == null || option.requiredState(state)

  }

  startGame();

});
