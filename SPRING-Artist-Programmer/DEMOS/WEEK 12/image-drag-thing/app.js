$(document).ready(function(){

  // console.log("ready");

  const $project = $("div.project");

  $project.hover(function(){

    let $currentID = $(this).attr('id');
    let path = `images/${ $currentID }.jpg`
    // console.log( path );

    $(this).mousemove(function( event ){

      // console.log("x", event.pageX)
      // console.log("y", event.pageY)

      let $img = $('<img>', {
        class : 'image-overlay',
        src : path
      });

      $img.css({
        position : 'absolute',
        top : event.pageY,
        left : event.pageX,
        'z-index' : 1
      });

      $img.appendTo('body');

    });

    $(this).mouseout(function(){
      $('.image-overlay').remove();
    });

  });
});
