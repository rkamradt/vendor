var Marionette = require('backbone.marionette'),
    Controller = require('./controller'),
    Router = require('./router'),
    ItemModel = require('./models/item'),
    ItemCollection = require('./collections/items'),
    UserModel = require('./models/user'),
    UserCollection = require('./collections/users');

module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application();

    App.core.on("initialize:before", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data = {};

        // load up some initial data:
        var users = new UserCollection();
        var items = new ItemCollection();
        users.fetch({
            success: function() {
                App.data.users = users;
                items.fetch({
                    success: function() {
                        App.data.items = items;
                        App.core.vent.trigger('app:start');
                    }
                });
            }
        });
    });

    App.core.vent.bind('app:start', function(options){
        App.core.vent.trigger('app:log', 'App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            App.core.vent.trigger('app:log', 'App: Backbone.history starting');
            Backbone.history.start();
        }

        //new up and views and render for base app here...
        App.core.vent.trigger('app:log', 'App: Done starting and running!');
    });

    App.core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });

    App.core.start();
};
