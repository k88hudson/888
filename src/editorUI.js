define([], function() {
  return {
    FitBottom: function( options ) {
      var element,
          parent;

      options = options || {};
      element = options.element || options.parent.children( options.parent.children.length - 1 );
      parent = options.parent || options.element.parentNode;

      function resizeFn() {
        element.style.height = parent.offsetHeight - element.offsetTop + "px";
      }

      window.addEventListener( "resize", resizeFn, false );
      resizeFn();
      this.element = element;
      this.update = resizeFn;
    },
    Accordion: function( options ) {
      var element,
          onUpdate;

      options = options || {};
      element = options.element;
      onUpdate = options.onUpdate || function(){};

      if ( !element ) {
        return;
      }

      var controls = element.querySelectorAll( "[data-tab-control]" );

      function onControlsClick( e ) {
        var whichTab,
            panel;

        e.preventDefault();

        whichTab = this.getAttribute( "data-tab-control" );
        if ( !whichTab ) {
          return;
        }

       panel = element.querySelector( "[data-tab=\"" + whichTab + "\"]" );
       panel.classList.toggle( "tab-on" );
       e.target.classList.toggle( "tab-on" );

       onUpdate();
      }

      for ( var i = 0; i < controls.length; i++ ) {
        controls[ i ].addEventListener( "click", onControlsClick, false );
      }

      return element;
    }
  };
});
