define(
    [
        "jquery",
        "backbone",
        "src/moduleHome",
        "src/moduleArticle",
        "backbone.ViewKit"
    ],
    function ($,
              Backbone,
              moduleHome,
              moduleArticle,
              BackboneViewKit
    ){

        "use strict";


        var viewSelector,
            viewStack;

        var Router = Backbone.Router.extend({
            viewHome : null,
            routes: {
                "" : "gotoHome",
                "article/:id"   : "gotoArticle"
            },
            initialize: function() {
                console.log("Router init");

                viewSelector = new Backbone.ViewKit.ViewSelector({
                    className: "view-selector"
                });
                viewStack = new Backbone.ViewKit.ViewStack({
                    transitions: {
                        push: new Backbone.ViewKit.Transitions.Slide(),
                        pop: new Backbone.ViewKit.Transitions.Slide({ reverse: true })
                    }
                });

                $('.root').empty().html(viewSelector.el);
                viewSelector.setViews([viewStack]);
                viewSelector.selectView(0);
            },
            gotoHome: function()
            {


                var bPushed = this.viewHome !== null;

                this.viewHome = this.viewHome || new moduleHome();

                if(bPushed)
                {
                    viewStack.popView();
                }
                else
                {
                    viewStack.pushView(this.viewHome);
                }

            },
            gotoArticle: function(hash){
                console.log("gotoArticle: hash", hash);
                var viewArticle = new moduleArticle();
                var router = this;
                viewArticle.$el.on("click", ".popView", function(evt)
                {
                    evt.preventDefault();
                    viewStack.popView();
                    router.navigate("");
                   setTimeout(function()
                   {
                       viewStack.getView().setupSwipe();
                   },450);
//                    Backbone.history.
                });
                viewStack.pushView(viewArticle);

            }
        });
        



        return {
            "version" : "0.0.1",
            "applicationName" : "SCMP",
            "App": Router
        };
    });