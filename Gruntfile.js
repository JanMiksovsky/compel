/*
 * Copyright 2013 The Polymer Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
module.exports = function( grunt ) {

  grunt.initConfig({
    compel: {
      demo: {
        options: {
          // So we can load both the compiled and original element at same time.
          suffix: "-compiled"
        },
        files: {
          "demo/test-element-compiled.js": "demo/test-element.html"
        }
      }
    }
  });

  grunt.loadTasks( "grunt" );

  grunt.registerTask( "default", [ "compel" ] );
};
