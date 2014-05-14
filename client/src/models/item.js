var Backbone = require('backbone');

module.exports = ItemModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/items'
});
