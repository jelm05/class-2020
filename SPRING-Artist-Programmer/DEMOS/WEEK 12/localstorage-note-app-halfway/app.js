$(document).ready(function(){

  const $content = $("div#content");
  let noteArray = [];

  const Utils = {
    uniqueID: function(){
      return Math.random().toString(36).substr(2,9);
    }
  }

  const App = {

    init: function() {
      console.log("initialized")
      App.bindEvents();
    },

    newNote: function() {

      const $win = $(window);
      const $input = $('input');
      let x = Math.random() * ( $win.width() - 100 );
      let y = 40 + Math.random() * ( $win.height() - 100 );

      let note = {
        id : Utils.uniqueID(),
        text : $input.val(),
        top : parseInt(y),
        left : parseInt(x)
      }

      noteArray.push( note );
      App.printNote( note.id, note.top, note.left, note.text )
      console.log( noteArray );

    },

    printNote: function( id, top, left, text ) {

      let note = $(
        `<div id=${id} class="note" style="top: ${top}px; left: ${left}px;">
        <p>${text}</p>
        <div class="kill">x</div>
        </div>`
      );

      note.appendTo( $content );

    },

    deleteNote: function( that ) {

      that.parent().remove();

    },

    bindEvents: function() {

      $('input').change(function(){
        App.newNote();
        $(this).val('');
      });

      $(document).on('click', '.kill', function(){
        App.deleteNote( $(this) );
      });

    }

  }

  App.init();

});
