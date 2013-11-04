// Register the element name such that instantiating it creates a node with
// the given inner HTML.
function r( name, innerHTML ) {
  var p = Object.create( HTMLElement.prototype );
  var t = document.createElement( "template" );
  t.innerHTML = innerHTML;
  p.createdCallback = function() {
    this.createShadowRoot().appendChild( t.content.cloneNode( true ) );
  }
  document.register( name, { prototype: p });
}
