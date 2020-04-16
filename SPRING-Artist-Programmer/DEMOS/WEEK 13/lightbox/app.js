$(document).ready(function(){

  const $lightBox = $(".lightbox");
  const $overlay = $("#lightbox-overlay");
  const $overlayImage = $("#lightbox-overlay-image");

  $lightBox.click(function(){

    let $src = $(this).children().attr("src");
    // Look at the overlay image and find the
    // the attribute of "src", and replace that
    // attribute with the string that we stored
    // in the variable $src  
    $overlayImage.attr("src", $src);
    $overlay.show();

  });

  $("#close").click( () => {
    $overlay.hide();
  });

  $overlay.click( () => {
    $overlay.hide();
  });

});
