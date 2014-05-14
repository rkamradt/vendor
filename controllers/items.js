var item = require('../app/models/item'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res, done) {
        console.log("item index: " + req.body);
        if(!done) {
            done = this.done;
        }
        item.ItemType.find({}, function(err, item) {
            done(res, err, item, 'Error finding items');
        });
    },
    getById: function(req, res, done) {
        console.log("item getById: " + req.body);
        if(!done) {
            done = this.done;
        }
        item.ItemType.find({ _id: req.params.id }, function(err, item) {
            done(res, err, item, 'Error finding item');
        });
    },
    add: function(req, res, done) {
        console.log("item add: " + req.body);
        var newItem = new item.ItemType(req.body);
        if(!done) {
            done = this.done;
        }
        newItem.save(function(err, item) {
            done(res, err, item, 'Error adding item');
        });
    },
    update: function(req, res, done) {
        console.log("item update: " + req.body);
        if(!done) {
            done = this.done;
        }
        item.ItemType.update({ _id: req.body.id }, req.body, function(err, item) {
            done(res, err, item, 'Error updating items');
        })
    },
    delete: function(req, res, done) {
        console.log("item delete: " + req.body);
        if(!done) {
            done = this.done;
        }
        item.ItemType.findOne({ _id: req.params.id }, function(err, item) {
            done(res, err, item, 'Item not found.');
        });
    },
    done: function(res, err, item, message) {
        if (err) {
            console.log("item done err: " + err + " " + message);
            res.json({error: message});
        } else if(item) {
            console.log("item done item: " + JSON.stringify(item));
            res.json(item);
        } else {
            console.log("item done: ");
            res.json(200, {status: 'Success'});
        }
    }
};
