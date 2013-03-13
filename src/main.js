require([
  "jquery",
  "text",
  "textToDom",
  "text!layouts/snippet.html",
  "jquery-ui",
  "jquery.beacon",
  "jquery.jBeacon"
], function( $, Text, Domfrag, _snippets ) {
  $(function() {

    var savedData = JSON.parse( localStorage.getItem( "BEACON_DATA" ) ) || {};
    var addTicketInput = document.querySelector( "#add-ticket" ),
        watchingContainer = document.querySelector( ".watching" );

    $.jBeacon.settings({
        account: "webmademovies",
        token: "2d1dd8fea4f425542a6d006758a94421c16305d9"
    });

    function updateSavedData() {
      localStorage.setItem( "BEACON_DATA", JSON.stringify( savedData ) );
    }

    function parseTicket( data ) {
      var ticketData = data.ticket;
      var el = Domfrag( _snippets ).querySelector( ".ticket" ).cloneNode( true );

      $.each( ticketData, function( key, val ) {
        var container = el.querySelector( ".t-" + key );
        if ( container ) {
          container.innerHTML = val;
        }
      });

      el.querySelector( ".last-comment" ).innerHTML = data.ticket.versions[ data.ticket.version - 1 ].body_html;
      $( watchingContainer ).prepend( el );
    }

    addTicketInput.addEventListener( "change", function( e ) {
      console.log( this.value );
      $.jBeacon.getTicket( 65733, this.value, parseTicket );
    }, false );

    $( watchingContainer ).sortable();

  });
});
