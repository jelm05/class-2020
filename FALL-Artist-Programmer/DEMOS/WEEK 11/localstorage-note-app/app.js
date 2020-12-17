$(document).ready(function(){

  // This is where we render our notes
  const content = $("#content");

  // This is where we store our notes
  const noteArray = [];

  const Utils = {
    uniqueId: function() {
      return Math.random().toString(36).substr(2, 9);
    }
  };

  const App = {

    init: function() {
      console.log("App initialized.")
      this.localStorageCheck();
      this.bindEvents();
    },

    newNote: function() {
      let win = $(window);
      let input = $("input");
      let x = Math.random() * ( win.width() - 100 );
      let y = Math.random() * ( win.height() - 50 );

      let note = {
        id: Utils.uniqueId(),
        text: input.val(),
        left: parseInt(x),
        top: parseInt(y)
      }

      noteArray.push(note);

      App.printNote( note.id, note.text, note.left, note.top );
      App.save();

    },

    printNote: function(id, text, left, top) {
      let note = $(
        `<div id=${id} class='note' style='left: ${left}px; top: ${top}px;'>
          <p>${text}</p>
          <div class='kill'>X</div>
         </div>`
      );

      note.appendTo(content);

      // Draggable comes from jQuery UI
      note.draggable().mouseup( function(){
        App.mouseupAction( $(this) );
      });
    },

    mouseupAction: function( that ) {

      if( that.is(".ui-draggable-dragging") ) {
        let newLeft = that.css("left");
        let newTop = that.css("top");
        let noteID = that.attr("id");
        console.log(noteID)
        App.updateNoteArray(noteID, parseInt(newLeft), parseInt(newTop));
        App.save();
      }

    },

    updateNoteArray: function( noteID, newLeft, newTop ) {

      for( var i in noteArray ) {

        if(noteArray[i].id === noteID ) {
          noteArray[i].left = newLeft;
          noteArray[i].top = newTop;
        }

      }

      App.save();

    },

    save: function() {
      localStorage.noteHTML = content.html();
    },

    clear: function() {
      localStorage.clear();
      $(".note").remove();
    },

    delete: function( that ) {
      let id = that.parent().attr("id");
      for (var i = 0; i < noteArray.length; i++) {
        if (noteArray[i].id === id) {
          noteArray.splice(id, 1);
        }
      }

      that.parent().remove();
      App.save();
    },

    localStorageCheck: function() {

      if(localStorage.noteHTML) {
        content.html(localStorage.noteHTML);

        $(".note").each(function(){
          $(".note").draggable().mouseup( function(){
            App.mouseupAction( $(this) );
          });
        });

        App.save();

      }

    },

    bindEvents: function() {

      $("input").change(function(){
        App.newNote();
        $(this).val('');
      });

      $("#clear").click(function() {
        App.clear();
      });

      $(document).on('click', '.kill', function(event) {
        event.stopPropagation();
        App.delete( $(this) );
      });

    }

  };

  App.init();

});
