var Marionette = require('backbone.marionette');

module.exports = ItemDetailsView = Marionette.ItemView.extend({
    template: require('../../templates/item_details.hbs'),
    events: {
        'click a.back': 'goBack',
        'click a.delete': 'deleteItem'
    },

    goBack: function(e) {
        e.preventDefault();
        window.App.controller.home();
    },
    deleteItem: function(e) {
        e.preventDefault();
        console.log('Deleting item');
        window.App.data.items.remove(this.model);

        // this will actually send a DELETE to the server:
        this.model.destroy();

        window.App.controller.home();
    }
});
