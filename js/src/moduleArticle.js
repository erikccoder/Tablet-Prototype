define(
    [   "jquery",
        "underscore",
        "backbone",
        "text!templates/page-tpl.html",
        "text!templates/article-tpl.html"
    ],function($, _, Backbone, tplPage, tplArticle)
{
       return Backbone.View.extend({

           className: "page",
           _$a: null,
           initialize: function() {
               this.render();
           },
           render: function() {
               var template = _.template(tplPage,{ bBack: true, mainContent: tplArticle });
               this.$el.html(template);
               this.bindEvents();

               return this;
           },
           bindEvents: function() {

               var _$a = this._$a;
               if(_$a)
               {
                   _$a.off("touchstart touchend");
               }
           }

       });
});