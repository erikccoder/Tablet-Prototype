define(
    [   "jquery",
        "underscore",
        "backbone",
        "src/dbHandler",
        "text!templates/page-tpl.html",
        "text!templates/home-carousel.html",
        "vendor/swipe"
    ],function($, _, Backbone, DBHandler, tplPage, tplCarousel)
{

       return Backbone.View.extend({

           className: "page non-selectable",
           _$a: null,
           mySwipe: null,
           initialize: function() {

               var self = this;

               this.dbHandler = new DBHandler();

               self.dbHandler.init(function()
               {
                   self.loadData();
               });
//               this.loadData();

           },
           loadData :function() {

               var self = this,
                   results;
/*
               $.getJSON("data/home_list.json")
                   .done(function(data)
                    {
                        console.log( "loaded \"data/home_list.json\"" );
                        console.log("data:",data);
                    })
                   .fail(function()
                   {
                       console.log( "error loading \"data/home_list.json\" " );
                   })
                   .always(function()
                   {
                       console.log( "complete $.getJSON" );
                   });
*/


               self.dbHandler.getContentFormPage("home");


                window.dbHandler = self.dbHandler;

               this.render();
           },
           render: function() {

               var template = _.template(tplPage,{ bBack: false, mainContent: tplCarousel });
               this.$el.html(template);

               this.bindEvents();
               return this;
           },
           setupSwipe: function()
           {
               this.mySwipe.setup();
           },
           bindEvents: function() {

               var _$a = this._$a,
                   mySwipe = this.mySwipe;
               if(_$a)
               {
                   _$a.off("touchstart touchend");
               }

               if(mySwipe)
               {
                   mySwipe.kill();
               }


               this.$el.on("touchstart", "a.box", function(evt)
               {

                   _$a = $(evt.currentTarget);
                   _$a.addClass("shrink");

               }).on("touchend", function(evt)
                   {
                       console.log("evt",evt);
                       _$a.removeClass("shrink");

                   });


               this.mySwipe = Swipe(document.getElementById('slider'));

           }

       });
});