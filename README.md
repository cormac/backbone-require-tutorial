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
  function() {//start the app here - module callback function
});
```
Dependencies are defined in the first argument which is an array, values here should correspond with what we have defined in loader.js.

The second argument is the module callback function. It is called when the module is included. The return value of the second argument will be our exported module, currently an empty object.

The first thing we want to define for our app is a search box, whose module we'll call input and it will be stored in the lib directory

updating main.js gives us
```javascript
define(
  ['lib/input'],// add module dependencies here
  function(Input) {//start the app here - module callback function
});
```



Next let's look at creating the module itself

- lib/input.js

In your lib folder there is a file called input.js which looks like this:

```javascript
define(
  ['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) { // - module callback function
    // expose our view as a module export
    return { };
});
```

We want to return a backbone view that represents a search box, so lets create that

Within the function define our Backbone view like so

```javascript
var SearchView = Backbone.View.extend({
  // element to attach our view to
  el: '#searchBox',
});
```
This will attach the View to the #searchBox DOM element which we already have in index.html

To see anything happen with the view we need to do two things, first expose the view to the outside world like so:

```javascript
    // expose our view as a module export
return {
  views: {
    SearchView: SearchView
  }
};
```

Next we instantiate the view in main/main.js as follows:

```javascript
var sb = new Input.views.SearchView();
```


There is still nothing contained in the view so we need to add some html content. By convention this is done in the render function.
We could create a html string directly and append it to the element, but this becomes difficult to maintain and bloats our javascript code.
Generally a template is used to represent the html data being displayed in the view. We can create a template using script 
tags with the type set to 'text/template' in index.html like so

```html
<script type='text/template' id="search-box-template">
  <input type="text" name="Search Twitter" placeholder="Search Twitter&#133;" value="" id="twitter_search">
</script>
```

The id tag will be used as a selector when we are creating the template function. Here we use the initialize function which
acts as a constructor to create the template, we then call the render function to add the html to the DOM element represented
by the view

```javascript
  // create our template function
  // initialize is called when the view is instantiated
  initialize: function() {
    this.template = _.template(
      $('#search-box-template').html()// use the id of the script tag to select it
    );
    this.render();
  },
  render: function() {
    var html = this.template();
    this.$el.append(html); //append the html to the element represented by the view
    return this;
  }
```

Note: $el property is a cached jQuery object for the view element

The view should now show an input box

Next we want to watch out for events on the input box. In this case we want to watch for key presses, if the key pressed is
return, empty the text box and do something with the text.

To this end we use the events property. The events property of a view can be used to declare events we are interested in. The
event is associated with a function on the view object. When the event occurs the associated function is called. A backbone 
view only listens for events on child nodes. We declare our events like so:


```javascript

  // declare the events that we will listen for
  events:{
    'keyup input': 'pressed'
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

    console.log('search_requested', textToSend);// show us what we got
  }
```

Here we've declared the function pressed to handle the event. When return is pressed we're simply logging the output on 
the console










