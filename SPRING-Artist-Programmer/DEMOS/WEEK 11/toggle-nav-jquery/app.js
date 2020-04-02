
$(document).ready(function(){

  const $button = $(".button h1");

  $button.click(function( event ){
    console.log("clicked");
    // console.log( $(this) );

    // $(this) references only the thing that we're 
    // immediately interacting with

    // $button.css({ "background-color" : "red" });
    // $(this).css({ "background-color" : "red" });

    // Will stop the animations compiling over and over again
    event.preventDefault();
    event.stopPropagation();

    // This targets ALL unordered lists
    // const $list = $('ul.toggle');

    // This targets JUST the unordered list
    // that is NEXT to the specific button we just clicked
    const $list = $(this).next('ul.toggle');
    $list.slideToggle('fast');

  });

});
