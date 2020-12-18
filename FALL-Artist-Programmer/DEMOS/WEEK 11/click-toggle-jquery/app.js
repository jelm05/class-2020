$(document).ready(function(){

  const button = $(".button h1");
  button.click(function(e){
    // The preventDefault() method cancels
    // the event if it is cancelable, meaning
    // that the default action that belongs
    // to the event will not occur.
    e.preventDefault();
    // The event.stopPropagation() method stops
    // the bubbling of an event to parent elements,
    // preventing any parent event handlers from
    // being executed.
    e.stopPropagation();
    // console.log("clicked");

    // $(this) corresponds to the thing we just clicked on
    // console.log( $(this) )
    const toggleList = $(this).next('ul.toggle');
    toggleList.slideToggle('fast');

    // $(this).slideToggle('fast');

  });
});
