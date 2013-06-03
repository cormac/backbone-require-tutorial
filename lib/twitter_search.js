/*global window, document, define */
'use strict';
(function(window, document, undefined) {
  define(
    ['jquery', 'lib/Dispatcher'],
    function($, dispatcher) {

      var TwitterSearch = function(term) {
        if (term !== undefined) {
          this.set_search_terms(term);
        }
        this.registerListeners();
      };

      TwitterSearch.prototype.registerListeners = function() {
        dispatcher.on('dispatch_search', function(term) {
          this.set_search_terms(term);
          this.run_search();
        }, this);
      };

      TwitterSearch.prototype.set_search_terms = function(term) {
        var search_string = 'http://search.twitter.com/search.json?q=';
        search_string += term;
        search_string += '&amp;rpp=5&amp;callback=?';
        this.search_string = search_string;
        return search_string;
      };

      TwitterSearch.prototype.run_search = function() {
        $.getJSON(this.search_string, function(data) {
          dispatcher.trigger('fetched_search', data.results);
        });
      };

      return TwitterSearch;

  });
}(window, document));
