/*global window, document, define */
'use strict';
(function(window, document, undefined) {
  define(
    ['jquery', 'lib/twitter_search', 'lib/input',
    'lib/router', 'backbone', 'lib/twitter_stream'
    ],
    function($, TwitterSearch, Input, AppRouter, Backbone, TwitterStream) {
      var ts = new TwitterSearch();
      var sb = new Input.views.SearchView();
      TwitterStream.init();
      var router = new AppRouter();
      Backbone.history.start();
  });
}(window, document));
