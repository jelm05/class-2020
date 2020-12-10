$(document).ready(function(){

  let userScrolled = false;
  let lastStopPoint = 0;
  let activationPoint = 150;

  $(window).scroll(function(){
    userScrolled = true;
  });

  setInterval(function(){
    if(userScrolled) {
      scrollAction();
      userScrolled = false;
    }
  }, 300);

  function scrollAction() {

    let top = $(this).scrollTop();

    if( top > activationPoint ) {
      $('header').removeClass('header-down').addClass('header-up');
    } else if ( top + $(window).height() < $(document).height() ) {
      $('header').removeClass('header-up').addClass('header-down');
    }

  }

});
