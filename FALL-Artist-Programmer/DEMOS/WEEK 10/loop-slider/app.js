
$(document).ready(function(){

  // We need:
  // to keep track of our slider, and our unordered list
  // to know how many slides we have
  // to know which slide is showing at any moment
  // to know which slide is first and last, so can clone loop them
  // a function to execute the slide action
  // a way to constantly update the position of all of our slides
  // a click event handler to execute our slide function

  let $ul = $(".slider ul");
  let slideCount = $ul.children().length;
  let slideWidth = 100 / slideCount;
  let slideIndex = 0;

  let firstSlide = $ul.find("li:first-child");
  let lastSlide = $ul.find("li:last-child");

  firstSlide.clone().appendTo($ul);
  lastSlide.clone().prependTo($ul)

  $ul.find("li").each(function(indx){
    let leftPercent = (slideWidth * indx) + "%";
    $(this).css({ "left" : leftPercent });
    $(this).css({ width : (100 / slideCount) + "%"});
  });

  $ul.css({"margin-left" : "-100%"});

  $(".slider .prev").click(function(){
    slide(slideIndex - 1);
  });

  $(".slider .next").click(function(){
    slide(slideIndex + 1);
  });

  function slide(newSlideIndex) {

    let marginLeft = (newSlideIndex * (-100)  -100) + "%";
    console.log(marginLeft)

    $ul.animate({ "margin-left": marginLeft }, 400, function(){

      if( newSlideIndex < 0 ) {
        let newMargin = ( (slideCount) * (-100) + "%" );
        $ul.css("margin-left", newMargin );
        newSlideIndex = slideCount - 1;
      } else if ( newSlideIndex >= slideCount ) {
        $ul.css("margin-left", "-100%");
        newSlideIndex = 0;
      }
      console.log("newSlideIndex", newSlideIndex)
      slideIndex = newSlideIndex;
    });

  }

});
