define([ "time" ], function( TimeUtil ) {
  return {
    Input: function( element ) {
      if ( element.classList.contains( "timecode-input" ) ) {
        element.addEventListener( "blur", function( e ) {
          element.value = TimeUtil.toTimecode( element.value );
        }, false );
        element.setAttribute( "placeholder", "00:00:00" );
      }
      return element;
    },
    Textarea: function ( element ) {
      var EXPANDMIN = 31,
          EXPANDMAX = 100;

      if ( !(element && (
        element.type === "text" ||
        element.type === "textarea" ||
        element.type === "url" )
      ))  {
        throw "Textbox: Expected an input element of type text";
      }

      function __highlight( e ) {
        var element = e.target;
        element.select();
        element.removeEventListener( "focus", __highlight, false );
      }

      function __ignoreMouseUp( e ) {
        e.preventDefault();
        var element = e.target;
        element.removeEventListener( "mouseup", __ignoreMouseUp, false );
      }

      function __addListeners( input ) {
        element.addEventListener( "focus", __highlight, false );
        element.addEventListener( "mouseup", __ignoreMouseUp, false );
      }

      function resizeTextbox( e ) {
        e = e.target || e;
        // Based on http://blogs.sitepointstatic.com/examples/tech/textarea-expander/jquery.textarea-expander.js
        var vlen = e.value.length, ewidth = e.offsetWidth;
        if (vlen != e.valLength || ewidth != e.boxWidth) {

          if ( vlen < e.valLength || ewidth != e.boxWidth ) {
            e.style.height = "0px";
          }

          var h = Math.max( EXPANDMIN, Math.min( e.scrollHeight, EXPANDMAX) );
          console.log( e.scrollHeight );
          e.style.overflow = ( e.scrollHeight > h ? "auto" : "hidden" );
          e.style.height = h + "px";

          e.valLength = vlen;
          e.boxWidth = ewidth;
        }
        return true;
      }

      element.addEventListener( "keyup", resizeTextbox, false );
      element.addEventListener( "focus", resizeTextbox, false );
      element.addEventListener( "blur", function( e ) {
        __addListeners( e.target );
      }, false);
      __addListeners( element );
      resizeTextbox( element );
    },
    SelectBox: function( element ) {
      var sortIcon = element.querySelector( "i" );
      function collapseOnWindowClick() {
        element.classList.remove( "expanded" );
        sortIcon.classList.remove( "icon-sort-up" );
        sortIcon.classList.add( "icon-sort-down" );
        window.removeEventListener( "click", collapseOnWindowClick, false );
      }
      function switchSelect( e ) {
        element.removeEventListener( "click", switchSelect, false );
        element.addEventListener( "click", openList, false );
        if ( e.target.tagName !== "LI" ) {
          return;
        }
        element.insertBefore( e.target, element.firstChild );
      }
      function openList( e ) {
        console.log( element.querySelector( "i" ) );
        element.classList.add( "expanded" );
        element.removeEventListener( "click", openList, false );
        element.addEventListener( "click", switchSelect, false );
        sortIcon.classList.add( "icon-sort-up" );
        sortIcon.classList.remove( "icon-sort-down" );
        setTimeout( function() {
          window.addEventListener( "click", collapseOnWindowClick, false ); 
        }, 0 );
      }

      element.addEventListener( "click", openList, false );
    },
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
          onUpdate,
          singlePanel;

      options = options || {};
      element = options.element;
      onUpdate = options.onUpdate || function(){};

      if ( !element ) {
        return;
      }

      var controls = element.querySelectorAll( "[data-tab-control]" );

      function onControlsClick( e ) {
        var whichTab,
            panel,
            oldSelected;

        e.preventDefault();

        whichTab = this.getAttribute( "data-tab-control" );
        if ( !whichTab ) {
          return;
        }

        if ( options.singlePanel ) {
          oldSelected = element.querySelectorAll( ".tab-on" );
          for ( var i = 0; i < oldSelected.length; i++ ) {
            oldSelected[ i ].classList.remove( "tab-on" );
          }
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
