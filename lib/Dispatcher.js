/*global define */
define(
  ['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) {
    var dispatcher = window.dispatcher || (function() {
      var dispatcherObject = {};
      _.extend(dispatcherObject, Backbone.Events);
      window.dispatcher = dispatcherObject;
      return dispatcherObject;
    }());
    return dispatcher;
    

});
