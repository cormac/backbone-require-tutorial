/*global window, document, define */
'use strict';
(function(window, document, undefined) {
  define(
    ['jquery', 'lib/twitter_search', 'lib/SearchBox',
    'lib/ResultsRouter', 'backbone', 'lib/ResultsCollection'
    ],
    function($, TwitterSearch, SearchBox, ResultsRouter, Backbone, ResultsModule) {
      console.log(SearchBox.views);
      var ts = new TwitterSearch();
      var sb = new SearchBox.views.SearchView();
      ResultsModule.init();
      var router = new ResultsRouter();
      Backbone.history.start();
  });
}(window, document));
