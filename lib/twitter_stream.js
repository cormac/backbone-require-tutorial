/*global define */
/**
## twitter_stream.js
Views to Display a list of tweets
Collection to store the fetched tweets
 */
define (
  ['jquery', 'underscore', 'backbone', 'lib/dispatcher'],
  function($, _, Backbone, dispatcher) {

    // Store a list of tweets
    // Register a listener to pick up tweets when fetched
    var ResultsCollection = Backbone.Collection.extend({
      // called when collection is instantiated
      // listen for fetched_search event
      initialize: function() {
        dispatcher.on('fetched_search', this.resultsFetched, this);
      },
      // function called when fetched_search event is triggered
      // set the contents of the collection with the array passed in
      resultsFetched: function(results) {
        this.reset(results);
      },
    });

    // Display a list of tweets
    // This view has the collection of tweets associated with it
    //
    // it's render function creates individual ResultView objects, renders
    // them and appends the result to the .twitter-results DOM element it 
    // represents
    var ResultsView = Backbone.View.extend({
      el: '.twitter-results',
      
      // listen for the built in reset event on the collection
      initialize: function() {
        this.collection.on('reset', this.render, this);
      },

      // render the list of tweets
      // remove old tweets first, then iterate over the collection
      render: function() {
        this.$el.empty();
        this.collection.each(this.renderTweet, this);
        return this;
      },

      // render an individual tweet
      renderTweet: function(model, index, list) {
        // send the model to the ResultView
        // backbone will automagically add the model attribute to the view when
        // it gets created
        var tweetView = new ResultView({model: model});
        // append the tweet to the current element
        // $el is a cached jquery object with the .twitter-results DOM element
        this.$el.append(tweetView.render().$el);
      }

    });

    // Individual tweet view
    var ResultView = Backbone.View.extend({

      // register our template function
      initialize: function() {
        this.template = _.template(
          $('#twitter_result').html()
        );
      },

      // render the tweet
      // the model has been passed in automatically
      // toJSON outputs the models attributs as a JSON object
      render: function() {
        this.$el.append(this.template({tweet: this.model.toJSON()}));
        return this;
      }
    });

    // instantiate our collection and list view
    var init = function() {
      var rc = new ResultsCollection();
      var rv = new ResultsView({collection: rc});
    };
    return { 
      init: init
    };
  
});
