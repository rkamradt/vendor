var Marionette = require('backbone.marionette'),
    ItemDetailsView = require('./views/item_details'),
    ItemListView = require('./views/items'),
    AddItemView = require('./views/add_item'),
    UserListView = require('./views/users'),
    UserDetailsView = require('./views/user_details'),
    SignUpView = require('./views/signup');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        window.App.views.contactsView = new ContactsView({ collection: window.App.data.contacts });
    },

    home: function() {
        App.core.vent.trigger('app:log', 'Controller: "Home" route hit.');
        var view = window.App.views.contactsView;
        this.renderView(view);
        window.App.router.navigate('#');
    },

    userDetails: function(id) {
        App.core.vent.trigger('app:log', 'Controller: "User Details" route hit.');
        var view = new UserDetailsView({ model: window.App.data.users.get(id)});
        this.renderView(view);
        window.App.router.navigate('userDetails/' + id);
    },
    
    itemDetails: function(id) {
        App.core.vent.trigger('app:log', 'Controller: "Item Details" route hit.');
        var view = new ItemDetailsView({ model: window.App.data.users.get(id)});
        this.renderView(view);
        window.App.router.navigate('itemDetails/' + id);
    },
    
    userList: function() {
        App.core.vent.trigger('app:log', 'Controller: "User List" route hit.');
        var view = new UserListView({ model: window.App.data.users.get()});
        this.renderView(view);
        window.App.router.navigate('userList');
    },
    
    itemList: function() {
        App.core.vent.trigger('app:log', 'Controller: "Item List" route hit.');
        var view = new ItemListView({ model: window.App.data.users.get()});
        this.renderView(view);
        window.App.router.navigate('itemList');
    },

    addItem: function() {
        App.core.vent.trigger('app:log', 'Controller: "Add Item" route hit.');
        var view = new AddItemView();
        this.renderView(view);
        window.App.router.navigate('addItem');
    },

    signUp: function() {
        App.core.vent.trigger('app:log', 'Controller: "Sign Up" route hit.');
        var view = new SignUpView();
        this.renderView(view);
        window.App.router.navigate('signUp');
    },

    renderView: function(view) {
        this.destroyCurrentView(view);
        App.core.vent.trigger('app:log', 'Controller: Rendering new view.');
        $('#js-boilerplate-app').html(view.render().el);
    },

    destroyCurrentView: function(view) {
        if (!_.isUndefined(window.App.views.currentView)) {
            App.core.vent.trigger('app:log', 'Controller: Destroying existing view.');
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});
