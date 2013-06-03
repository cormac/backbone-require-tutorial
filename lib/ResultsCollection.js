/*global define */
define (
  ['jquery', 'underscore', 'backbone',
   'lib/Dispatcher', 'lib/twitter_search'],
  function($, _, Backbone, dispatcher, TwitterSearch) {
    var ResultsCollection = Backbone.Collection.extend({
      initialize: function() {
        dispatcher.on('fetched_search', this.resultsFetched, this);
      },
      resultsFetched: function(results) {
        this.reset(results);
      },
    });
    var ResultsView = Backbone.View.extend({
      el: '.twitter-results',
      initialize: function() {
        this.collection.on('reset', this.render, this);
      },
      render: function() {
        this.$el.empty();
        this.collection.each(this.renderTweet, this);
        return this;
      },
      renderTweet: function(model, index, list) {
        var tweetView = new ResultView({model: model});
        this.$el.append(tweetView.render().$el);
      }

    });

    var ResultView = Backbone.View.extend({
      initialize: function() {
        this.template = _.template(
          $('#twitter_result').html()
        );
      },
      render: function() {
        this.$el.append(this.template({tweet: this.model.toJSON()}));
        return this;
      }
    });

    var init = function() {
      var rc = new ResultsCollection();
      var rv = new ResultsView({collection: rc});
    };
    return { 
      init: init
    };
  
});
