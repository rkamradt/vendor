var Marionette = require('backbone.marionette');

module.exports = SignUpView = Marionette.ItemView.extend({
    template: require('../../templates/logon.hbs'),
    events: {
        'click a.save-button': 'save'
    },

    save: function(e) {
        e.preventDefault();
        var newUser = {
            userid: this.$el.find('#userid').val(),
            password: this.$el.find('#password').val()
        };

        window.App.core.vent.trigger('app:log', 'Log On View: logged on!');
        window.App.controller.home();
    }
});
