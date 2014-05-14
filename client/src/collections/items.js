var Backbone = require('backbone'),
    ItemModel = require('../models/item');

module.exports = ItemsCollection = Backbone.Collection.extend({
    model:  ItemModel,
    url: '/api/items'
});
