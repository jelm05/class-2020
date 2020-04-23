$(document).ready(function(){

  console.log("ready")

  $("input#search").keyup(function( event ){

    if ( event.keyCode === 13 ) {
      let $search = $(this).val();
      searchWiki( $search )
    }

  });

  function searchWiki( searchWord ){

    let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchWord}&format=json&callback=?`;

    $.ajax({
      url : url,
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: 'json',
      success: function( data, status, jqXHR) {
        $("#output").html(' ');
        console.log("data", data)
        // console.log("status", status)

        for (var i = 0; i < data[1].length; i++) {
          $("#output").append(
            `<div class="search-result">
              <a href="${ data[3][i] }" target="_blank">
              ${ data[1][i] }
              </a>
            </div>`
          );
        }

      },

    }).done( () => {
      console.log("success!")
    }).fail( () => {
      console.log("fail!")
    }).always( () => {
      console.log("complete!")
    });

  }

});
