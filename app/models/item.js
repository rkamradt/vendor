var mongoose = require('mongoose'),
    md5 = require('MD5'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
    name:      { type: String },
    description: { type: String },
    price:     { type: Number },
    qtyDisc:   { type: Number }
});

ItemSchema.methods.setNewValues = function(name, desc, price, qtyDisc) {
    if(!name || !price) {
        throw 'name and price are required to create an item';
    }
    this.name = name;
    this.description = desc || "";
    this.price = price;
    this.qtyDisc = qtyDisc || 0;
};

ItemSchema.methods.getPrice = function(qty) {
    var ret = this.price*qty;
    if(qty >= 10) {
        var disc = this.qtyDisc * ret;
        ret -= disc;
    }
    return ret;
}

ItemSchema.statics.createItem = function(name, desc, price, qtyDisc) { 
    var ret = new itemClass;
    ret.setNewValues(name, desc, price, qtyDisc);
    return ret;
};
ItemSchema.statics.createItemFromJSON = function(json, update) {
    var ret = new itemClass(json);
    return ret;
};


var itemClass = mongoose.model('itemClass', ItemSchema);

module.exports = itemClass;

