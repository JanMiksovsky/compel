// Task definition for Grunt.
module.exports = function( grunt ) {

  grunt.registerMultiTask( "compel", "Compile HTML custom elements to JavaScript", function() {

    var fs = require( "fs" );
    var compel = require( "../compel.js" );
    
    var options = this.options();
    if ( options.suffix ) {
      compel.suffix = options.suffix;
    }

    for ( var i in this.files ) {
      var file = this.files[i];
      var src = file.src.toString();
      var dest = file.dest;
      var html = fs.readFileSync( src );
      var js = compel.compileHtmlElement( html );
      fs.writeFileSync( dest, js );
    }

  });

};
