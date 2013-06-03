/*global define */
define (
  ['jquery', 'underscore', 'backbone',
   'lib/Dispatcher', 'lib/twitter_search'],
  function($, _, Backbone, dispatcher, TwitterSearch) {
    var ResultsRouter = Backbone.Router.extend({
      routes: {
        'search/:searchTerm': 'search'
      },
      initialize: function() {
        dispatcher.on('search_requested', this.searchRequested, this);
      },
      searchRequested: function(searchTerm) {
        this.navigate('search/' + searchTerm.encoded, {trigger: true});
      },
      search: function(searchTerm) {
        dispatcher.trigger('dispatch_search', searchTerm);
      }
    });
    return ResultsRouter;
  
});

