var user = require('../app/models/user'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res, done) {
        console.log("user index: " + req.body);
        if(!done) {
            done = this.done;
        }
        user.UserType.find({}, function(err, data) {
            done(res, err, item, 'Error adding item');
        });
    },
    getById: function(req, res, done) {
        console.log("user getById: " + req.body);
        if(!done) {
            done = this.done;
        }
        user.UserType.find({ _id: req.params.id }, function(err, user) {
            done(res, err, item, 'Error adding item');
        });
    },
    add: function(req, res, done) {
        console.log("user add: " + req.body);
        if(!done) {
            done = this.done;
        }
        var newUser = new user.createUserFromJSON(req.body,false);
        newUser.gravatar = md5(newUser.email);
        newUser.save(function(err, user) {
            done(res, err, item, 'Error adding item');
        });
    },
    update: function(req, res, done) {
        console.log("user update: " + req.body);
        if(!done) {
            done = this.done;
        }
        user.UserType.update({ _id: req.body.id }, req.body, function(err, updated) {
            done(res, err, item, 'Error adding item');
         })
    },
    delete: function(req, res, done) {
        console.log("user delete: " + req.body);
        if(!done) {
            done = this.done;
        }
        user.UserType.findOne({ _id: req.params.id }, function(err, user) {
            if (err) {
                res.json({error: 'User not found.'});
            } else {
                contact.remove(function(err, user){
                    done(res, err, item, 'Error adding item');
                })
            }
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
