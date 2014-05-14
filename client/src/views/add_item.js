var Marionette = require('backbone.marionette');

module.exports = AddItemView = Marionette.ItemView.extend({
    template: require('../../templates/addItem.hbs'),
    events: {
        'click a.save-button': 'save'
    },

    save: function(e) {
        e.preventDefault();
        var newItem = {
            name: this.$el.find('#name').val(),
            description: this.$el.find('#description').val(),
            price: this.$el.find('#price').val(),
            qtyDisc: this.$el.find('#qtyDisc').val()
        };

        window.App.data.items.create(newItem);
        window.App.core.vent.trigger('app:log', 'Add Item View: Saved new item!');
        window.App.controller.home();
    }
});
