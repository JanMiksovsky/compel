CompEl element compiler experiment
==================================

This is just a quick experiment to play around with the idea of compiling
.html files for custom elements into plain .js JavaScript files. JavaScript
files might be an interesting packaging medium for custom elements:

* You could combine a .js file with custom elements with other .js files (with
  polymer.js, among others) to reduce the number of resources which must be
  fetched for a page to load.
* JavaScript files could be optimized with existing techniques (e.g., Google's
  Closure compiler) to, for example, eliminate dead code for unused elements.
* Experimentation might point to better performance. Currently the compiler
  just sets innerHTML, but it could just as easily output appendChild() calls.
  It could also take care of things like identifying Polymer's this.$.foo
  automatic node references or MDV bindings at compile time.

This is just a proof of concept. The compiler doesn't register elements as
Polymer elements yet (it uses document.register directly), and doesn't handle
the full range of element syntax: attributes, "extends=", etc.

Install
=======

```
> npm install
```

Edit the demo element at demo/test-element.html, then run `grunt` to recompile.
The demo is visible at http://JanMiksovsky.github.io/compel/demo.
