
$(document).ready(function(){

  let $ul = $(".slider ul");
  let $slideCount = $ul.children().length;
  let $slideWidth = 100.0 / $slideCount;

  let firstSlide = $ul.find("li:first-child");
  let lastSlide = $ul.find("li:last-child");
  firstSlide.clone().appendTo( $ul );
  lastSlide.clone().prependTo( $ul );

  // This is just dynamically making all slides horizontal
  // After we cloned them
  $ul.find('li').each(function( indx ) {
    let leftPosition = ( $slideWidth * indx ) + "%";

    // Apply the percentage that we calculated as the left css property
    // This puts them neatly in a line
    $(this).css({ "left" : leftPosition });

    // Set the width of each slide according to the number of slides we have
    // We divide by 100 because we set the width of our slider to 100%
    $(this).css({ width : ( 100 / $slideCount ) + "%" });

  });


  // Everything above this point, is positioning our slides
  // And making sure they're horizontal
  // Everything below, is to advance the slides

  let slideIndex = 0;
  $ul.css("margin-left", "-100%");

  $(".slider .prev").click(function(){
    slide(slideIndex - 1)
  });

  $(".slider .next").click(function(){
    slide(slideIndex + 1)
  });

  function slide( newSlideIndex ) {
    console.log( "slideIndex", slideIndex );
    console.log( "newSlideIndex", newSlideIndex );
    console.log("slideCount", $slideCount)
    // This is to calculate how far to move the slider
    let marginLeft = (newSlideIndex * (-100) - 100) + "%";
    console.log("the number that matters: ", marginLeft);

    $ul.animate({ "margin-left" : marginLeft }, 400, function(){

      if ( newSlideIndex < 0 ) {
        $ul.css( "margin-left", ( ($slideCount) * (-100) ) + "%" );
        newSlideIndex = $slideCount - 1;
      } else if ( newSlideIndex >= $slideCount ) {
        $ul.css("margin-left", "-100%");
        newSlideIndex = 0;
      }

      // 1 = 2;
      slideIndex = newSlideIndex;

    });

  }

});
