/*global requirejs */
"use strict";
(function(requirejs) {
  requirejs.config({
    "paths": {
      "lib": "lib",
      "main": "main",
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      "backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min",
      "underscore":"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    }

  });

  // Load the main app module to start the app
  requirejs(["main/main"]);
}(requirejs));
