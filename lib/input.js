/*global define */
/**
### input
represent an input field, reacts to the enter button being pressed
when focus is on the input by sending the content of the input box
in the search_requested event
*/
define(
  ['jquery', 'underscore', 'backbone', 'lib/dispatcher'],
  function ($, _, Backbone, dispatcher) {
    var SearchView = Backbone.View.extend({
      // element to attach our view to
      el: '#searchBox',
      tagName: 'div',
      // declare the events that we will listen for
      events:{
        'keyup input': 'pressed'
      },
      // create our template function
      // initialize is called when the view is instantiated
      initialize: function() {
        this.template = _.template(
          $('#search-box-template').html()
        );
        this.render();
      },
      // catch the keyup event
      pressed: function(e) {
        if (e.keyCode === 13) {
          this.sendText(this.$el.children('input').val());
          this.$el.children('input').val('');
        }
      },
      // dispatch event with contents of the input field
      sendText: function(inputText) {
        var textToSend = {
          raw: inputText,
          encoded: window.encodeURI(inputText)
        };

        console.log('search_requested', textToSend);
        //dispatcher.trigger('search_requested', textToSend);

      },

      render: function() {
        var html = this.template();
        this.$el.append(html);
        return this;
      }
    });
    // expose our view as a module export
    return {
      views: {
        SearchView: SearchView
      }
    };
});
