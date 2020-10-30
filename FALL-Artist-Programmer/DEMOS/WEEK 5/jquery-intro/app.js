

$(document).ready(function(){

  // console.log("ready!");

  // let box = document.getElementsByClassName('box');
  let $box = $(".box");

  $box.click(function(){

    $box.animate({
      left: "500px",
      top: "250px",
      width: "250px"
    });

  });

});
