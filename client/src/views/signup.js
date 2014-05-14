var Marionette = require('backbone.marionette');

module.exports = SignUpView = Marionette.ItemView.extend({
    template: require('../../templates/signup.hbs'),
    events: {
        'click a.save-button': 'save'
    },

    save: function(e) {
        e.preventDefault();
        var newUser = {
            firstname: this.$el.find('#firstname').val(),
            lastname: this.$el.find('#lastname').val(),
            phone: this.$el.find('#phone').val(),
            email: this.$el.find('#email').val()
            password: this.$el.find('#password').val()
        };

        window.App.data.users.create(newUser);
        window.App.core.vent.trigger('app:log', 'Sign Up View: Saved new user!');
        window.App.controller.home();
    }
});
