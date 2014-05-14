var Marionette = require('backbone.marionette');

module.exports = Router = Marionette.AppRouter.extend({
    appRoutes: {
        ''  : 'home',
        'userDetails/:id' : 'userDetails',
        'itemDetails/:id' : 'itemDetails',
        'itemList' : 'itemList',
        'userList' : 'userList',
        'addItem' : 'addItem',
        'logon' : 'logon',
        'signup' : 'signup'
    }
});
