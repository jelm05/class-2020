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
      App.localStorageCheck();
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
        left : parseInt(x),
      }

      noteArray.push( note );
      App.printNote( note.id, note.top, note.left, note.text )
      // console.log( noteArray );
      App.save();
    },

    printNote: function( id, top, left, text ) {

      let note = $(
        `<div id=${id} class="note" style="top: ${top}px; left: ${left}px;">
        <p>${text}</p>
        <div class="kill">x</div>
        </div>`
      );

      note.appendTo( $content );
      // Make note draggable right when it's created
      note.draggable().mouseup( function() {
        App.mouseupActions( $(this) );
      });

    },

    mouseupActions: function( that ) {

      if( that.is(".ui-draggable-dragging") ) {
        let noteID = that.attr("id");
        let newTop = that.css("top");
        let newLeft = that.css("left");
        console.log( noteID, newTop, newLeft);

        App.updateNoteArray( noteID, parseInt( newTop ), parseInt( newLeft ) );
        App.save();
      }

    },

    updateNoteArray: function( noteID, newTop, newLeft ) {

      for( var i in noteArray ) {
        if ( noteArray[i].id === noteID ) {
          noteArray[i].top = newTop;
          noteArray[i].left = newLeft;
        }
        App.save();
      }

    },

    save: function() {
      localStorage.noteHTML = $content.html();
      console.log("localStorage", localStorage )
      console.log("localStorage.noteHTML", localStorage.noteHTML )
    },

    clear: function() {
      localStorage.clear();
      $(".note").remove();
      console.log( localStorage.noteHTML)
    },

    deleteNote: function( that ) {

      let $id = that.parent().attr('id');
      for (var i = 0; i < noteArray.length; i++) {
        if ( noteArray[i].id === $id ) {
          noteArray.splice( $id, 1 );
        }
      }
      that.parent().remove();
      App.save();

    },

    localStorageCheck: function(){

      if ( localStorage.noteHTML ) {
        $content.html( localStorage.noteHTML );
        $(".note").draggable().mouseup( function() {
          App.mouseupActions( $(this) );
        });
      }

    },

    bindEvents: function() {

      $('input').change(function(){
        App.newNote();
        $(this).val('');
      });

      $('#clear').on('click', function() {

        let conf = confirm("Are you sure you want to clear all notes?");
        if ( conf == true ) {
          App.clear();
        }

      });

      $(document).on('click', '.kill', function(){
        App.deleteNote( $(this) );
      });

    }

  }

  App.init();

});
