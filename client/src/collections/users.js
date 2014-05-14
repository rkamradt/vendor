var Backbone = require('backbone'),
    UserModel = require('../models/user');

module.exports = UsersCollection = Backbone.Collection.extend({
    model:  UserModel,
    url: '/api/users'
});
