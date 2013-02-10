require.config({
  context: "888",
  baseUrl: "src",
  paths: {
    "text": "../lib/text",
    "jquery": "../lib/jquery",
    "jquery-ui": "../lib/jquery-ui",
    "domfrag" : "../lib/textToDom"
  }
})([
  "jquery", "jquery-ui", "domfrag",
  "text!layouts/snippet.html"
], function(
  $, UI, Domfrag,
  _snippet
){

  // Start
  var snippet = Domfrag( _snippet ).querySelector( ".snippet" );

});
