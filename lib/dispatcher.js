/*global define */
/**
## dispatcher
create a global event dispatcher that can be required as a module, the event
dispatcher passes messages around our different modules helping us to achieve
a decoupled architecture
*/
define(
  ['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) {
    
    // create a global dispatcher object if it does not already exist
    var dispatcher = window.dispatcher || (function() {
      var dispatcherObject = {};
      _.extend(dispatcherObject, Backbone.Events);
      window.dispatcher = dispatcherObject;
      return dispatcherObject;
    }());// self calling function

    return dispatcher;
    

});
