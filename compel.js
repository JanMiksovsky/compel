// Simplistic "compiler" of HTML element definitions to JavaScript.
(function() {

var fs = require( "fs" );
var htmlparser = require( "htmlparser" );
var path = require( "path" );

function findElementDom( dom ) {
  for ( i in dom ) {
    var child = dom[i];
    if ( child.type === "tag" && child.name === "polymer-element" ) {
      return child;
    }
  }
  return null;
}

function elementDomToHtml( dom ) {
  var html;
  if ( dom == null ) {
    html = "";
  } else if ( dom.constructor === Array ) {
    html = "";
    for ( i in dom ) {
      html += elementDomToHtml( dom[i] );
    }
  } else {
    switch ( dom.type ) {
      case "tag":
        var openTag = "<" + dom.name + ">";
        var content = elementDomToHtml( dom.children );
        var closeTag = "</" + dom.name + ">";
        html = openTag + content + closeTag;
        break;
      case "text":
        var s = JSON.stringify( dom.data );
        // Remove quotes;
        html = s.slice( 1, s.length - 1 );
        break;
      default: 
        html = "";
        break;
    }
  }
  return html;
}

// Given an htmlparser representation of the DOM for a polymer-element
// definition, return the corresponding JavaScript.
function elementDomToJs( dom ) {
  var elementName = dom.attribs.name;
  if ( compel.suffix ) {
    elementName += compel.suffix;
  }
  var templateHtml = elementDomToHtml( dom.children[0].children );
  var js = "r(\"" + elementName + "\",\"" + templateHtml + "\");" ;
  return js;
}

function elementHtmlToDom( html ) {
  var options = { verbose: false, ignoreWhitespace: true };
  var handler = new htmlparser.DefaultHandler( function( error, dom ) {
    if ( error ) {
      // TODO: Error checking.
    }
  }, options);
  var parser = new htmlparser.Parser( handler );
  var result = parser.parseComplete( html );
  return handler.dom;
}

function compileHtmlElement( html ) {
  var dom = elementHtmlToDom( html );
  var elementDom = findElementDom( dom );
  var js = elementDom ? elementDomToJs( elementDom ) : null;
  return js;
}

var compel = {
  compileHtmlElement: compileHtmlElement,
  suffix: null
};

if ( typeof window !== "undefined" ) {
  window.compel = compel;
}
module.exports = compel;

// If we invoke directly via node, compile the demo.
var scriptPath = process ? process.argv[1] : null;
if ( path &&  path.basename( scriptPath ) === "compel.js" ) {
  var html = fs.readFileSync( "demo/test-element.html" );
  var js = compileHtmlElement( html );
  console.log( js );
}

})();
