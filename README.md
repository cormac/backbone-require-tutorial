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

A main method is then loaded to start up our application
```javascript
requirejs(["main/main"]);
```
this loads the file at main/main.js

- main/main.js

This is the entry point to our application. We will use it to fire up the different modules we need for our application.

We start off with an empty define function

```javascript
define(
  [],// add module dependencies here
  function() {//start the app here
});
```

The first thing we want to define for our app is a search box, whose module we'll call input and it will be stored in the lib directory

updating main.js gives us
```javascript
define(
  ['lib/input'],// add module dependencies here
  function(Input) {//start the app here
});
```

Next let's look at creating the module itself
- lib/input.js
In your lib folder there is a file called input.js which looks like this:
```javascript
define(
  ['jquery', 'underscore', 'backbone', 'lib/dispatcher'],
  function ($, _, Backbone, dispatcher) {
    // expose our view as a module export
    return { };
});
```
we are defining our module with the listed dependencies in the first array arg.
The return value of the second argument will be our exported module, currently an empty object.

We want to return a backbone view that represents a search box, so lets create that

```javascript
var SearchView = Backbone.View.extend({
  // element to attach our view to
  el: '#searchBox',
  tagName: 'div',
  // declare the events that we will listen for
  events:{
    'keyup input': 'pressed'
  },
  // create our template function
  // initialize is called when the view is instantiated
  initialize: function() {
    this.template = _.template(
      $('#search-box-template').html()
    );
    this.render();
  },
  // catch the keyup event
  pressed: function(e) {
    if (e.keyCode === 13) {
      this.sendText(this.$el.children('input').val());
      this.$el.children('input').val('');
    }
  },
  // dispatch event with contents of the input field
  sendText: function(inputText) {
    var textToSend = {
      raw: inputText,
      encoded: window.encodeURI(inputText)
    };

    console.log('search_requested', textToSend);
    //dispatcher.trigger('search_requested', textToSend);

  },

  render: function() {
    var html = this.template();
    this.$el.append(html);
        return this;
  }
});
  // expose our view as a module export
return {
  views: {
    SearchView: SearchView
  }
};
```








