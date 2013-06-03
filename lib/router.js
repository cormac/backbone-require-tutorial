/*global define */
/**
## router.js
the router allows us to set the state of our application
here we set it to the search term passed into our input box
if we return to the page with the url set it will trigger any routes
that match the url pattern
*/
define (
  ['jquery', 'underscore', 'backbone',
   'lib/dispatcher'],
  function($, _, Backbone, dispatcher) {
    var ResultsRouter = Backbone.Router.extend({
      // associate the route with a function
      // :searchTerm is a wildcard that will pass a variable to 
      // the declared search function
      routes: {
        'search/:searchTerm': 'search'
      },
      // register the search_requested event listener
      initialize: function() {
        dispatcher.on('search_requested', this.searchRequested, this);
      },
      // handler for custom event
      // navigates to the url triggering the associated function
      searchRequested: function(searchTerm) {
        this.navigate('search/' + searchTerm.encoded, {trigger: true});
      },
      // trigger an event when the user navigates to the handled url
      search: function(searchTerm) {
        dispatcher.trigger('dispatch_search', searchTerm);
      }
    });
    return ResultsRouter;
  
});

