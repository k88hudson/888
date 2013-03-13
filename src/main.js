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

    var fitBottom = new UI.FitBottom({element: row3 }),
        accordion = new UI.Accordion({
          element: accordionEl,
          onUpdate: function() {
            fitBottom.update();
          }
        });

  });
});
