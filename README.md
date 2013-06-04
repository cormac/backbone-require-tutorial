backbone-require-tutorial
=========================

### start branch

This contains the skeleton file structure of the app with all requireJs config in place

#### Files: 

- index.html

this is our app page, includes some styles and a reference to the loader script

```html
<script data-main="loader" charset="utf-8" src="components/requirejs/require.js"> </script>
```

This tells require that the loader file used to define the project structure and external dependencies is in a file called loader.js in the root folder

- loader.js

define our application paths and external dependencies
```javascript
"paths": {
  "lib": "lib",
  "main": "main",
  "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
  "backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min",
  "underscore":"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"
},
```
the paths object contains references to module paths within our application, these paths can later be used to import modules contained in that folder into our app - see main.js for an example

eg: lib refers to files in the lib folder, so a file at lib/aFile.js could be loaded with lib/aFile

jquery is an external module that we call in from it's cdn, it exports a module we can use

underscore and backbone do not define requireJs modules so we need to shim them as follows

```javascript
shim: {
  underscore: {
    exports: '_'
  },
  backbone: {
    deps: ['underscore', 'jquery'],
    exports: 'Backbone'
  }
}
```
backbone and underscore both expose global objects, using the shim technique we can convert these to require comptible modules
