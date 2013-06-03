/*global window, document, define */
/**
## twitter_search.js
Twitter Search object
respond to dispatch_search event
trigger fetched_search event with results of the search
 */
'use strict';
(function(window, document, undefined) {
  define(
    ['jquery'/*, 'lib/dispatcher'*/],
    function($/*, dispatcher*/) {

      // search object constructor
      // register listeners for custom events
      var TwitterSearch = function() {
        this.registerListeners();
      };

      // create listeners for the dispatch_search event
      TwitterSearch.prototype.registerListeners = function() {
        /*dispatcher.on('dispatch_search', function(term) {
          this.set_search_terms(term);
          this.run_search();
        }, this);*/
      };

      // build the string that will be used to get the json results
      TwitterSearch.prototype.set_search_terms = function(term) {
        var search_string = 'http://search.twitter.com/search.json?q=';
        search_string += term;
        search_string += '&amp;rpp=5&amp;callback=?';
        this.search_string = search_string;
        return search_string;
      };

      // run the twitter api call
      // dispatch the fetched_search event with the results
      TwitterSearch.prototype.run_search = function() {
        $.getJSON(this.search_string, function(data) {
          //dispatcher.trigger('fetched_search', data.results);
        });
      };

      return TwitterSearch;

  });
}(window, document));
