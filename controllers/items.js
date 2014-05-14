var item = require('../app/models/item'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res, d) {
        var done = d;
        if(!done) {
            done = this.done;
        }
        item.ItemType.find({}, function(err, item) {
            done(res, err, item, 'Error finding items');
        });
    },
    getById: function(req, res, done) {
        item.ItemType.find({ _id: req.params.id }, function(err, item) {
            done(res, err, item, 'Error finding item');
        });
    },
    add: function(req, res, done) {
        var newItem = new item.ItemType(req.body);
        newItem.save(function(err, item) {
            done(res, err, item, 'Error adding item');
        });
    },
    update: function(req, res, done) {
        console.log(req.body);
        item.ItemType.update({ _id: req.body.id }, req.body, function(err, item) {
            done(res, err, item, 'Error updating items');
        })
    },
    delete: function(req, res, done) {
        item.ItemType.findOne({ _id: req.params.id }, function(err, item) {
            done(res, err, item, 'Item not found.');
        });
    },
    done: function(res, err, item, message) {
        if (err) {
            res.json({error: message});
        } else if(item) {
            res.json(item);
        } else {
            res.json(200, {status: 'Success'});
        }
    }
};
