require.config({
    //By default load any module IDs from js/lib
    "baseUrl": 'js/',
    "paths": {
        "jquery": "vendor/jquery-1.9.0.min",
        "backbone" : "vendor/backbone-min",
        "backbone.ViewKit" : "vendor/backbone.viewKit",
        "templates": '../templates',
        "text" : "vendor/text",
        "underscore": "vendor/underscore-min"
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'backbone.ViewKit': {
            deps: ['backbone'],
            exports: 'Backbone.ViewKit'
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        "swipe":
        {
            exports: "Swipe"
        }
    }
});

require([
    // Load our app module and pass it to our definition function
   "scmp",
    "plugins"
], function(SCMP, Plugins){


    console.log("SCMP",SCMP);

    var app = new SCMP.App();
    Backbone.history.start();
    app.navigate("",{trigger: true});


/*

    document.ontouchstart = function(e){
        e.preventDefault();
    }
*/

});