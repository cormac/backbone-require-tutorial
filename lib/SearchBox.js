/*global define */
define(
  ['jquery', 'underscore', 'backbone', 'lib/Dispatcher'],
  function ($, _, Backbone, dispatcher) {
    var SearchView = Backbone.View.extend({
      el: '#searchBox',
      tagName: 'div',
      events:{
        'keyup input': 'pressed'
      },
      initialize: function() {
        console.log('initialize');
        this.template = _.template(
          $('#search-box-template').html()
        );
        this.render();

      },
      pressed: function(e) {
        if (e.keyCode === 13) {
          this.sendText(this.$el.children('input').val());
          this.$el.children('input').val('');
        }
      },
      sendText: function(inputText) {
        var textToSend = {
          raw: inputText,
          encoded: window.encodeURI(inputText)
        };
        dispatcher.trigger('search_requested', textToSend);

      },

      render: function() {
        var html = this.template();
        this.$el.append(html);
        return this;
      }
    });
    return {
      views: {
        SearchView: SearchView
      }
    };
});
