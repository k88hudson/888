require([
  "jquery",
  "text",
  "textToDom",
  "editorUI",
  "text!layouts/snippet.html",
  "jquery-ui"
], function( $, Text, Domfrag, UI, _snippets ) {
  $(function() {

    var leftPanel = document.querySelector( ".left-panel" ),
        row3 = document.querySelector( ".bottom-row" ),
        accordionEl = document.querySelector( ".accordion" );

    var fitBottom,
        accordion = new UI.Accordion({
          element: accordionEl,
          onUpdate: function() {
            fitBottom.update();
          }
        });

    fitBottom = new UI.FitBottom({ element: row3 });

    UI.Textarea( document.getElementById( "textbox-eg" ) );
    UI.Input( document.querySelector( ".timecode-input" ) );
    UI.SelectBox( document.querySelector( ".select" ) );

    new UI.Accordion({
      singlePanel: true,
      element: document.getElementById( "media-input" ),
    });

    $( ".floating-panel" ).draggable();

  });
});
