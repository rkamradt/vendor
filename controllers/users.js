var user = require('../app/models/user'),
    md5 = require('MD5');

module.exports = {
    index: function(req, res) {
        user.UserType.find({}, function(err, data) {
            res.json(data);
        });
    },
    getById: function(req, res) {
        user.UserType.find({ _id: req.params.id }, function(err, user) {
            if (err) {
                res.json({error: 'user not found.'});
            } else {
                res.json(user);
            }
        });
    },
    add: function(req, res) {
        var newUser = new user.createUserFromJSON(req.body,false);
        newUser.gravatar = md5(newUser.email);
        newUser.save(function(err, user) {
            if (err) {
                res.json({error: 'Error adding user.'});
            } else {
                res.json(user);
            }
        });
    },
    update: function(req, res) {
         console.log(req.body);
         user.UserType.update({ _id: req.body.id }, req.body, function(err, updated) {
             if (err) {
                 res.json({error: 'User not found.'});
             } else {
                 res.json(updated);
             }
         })
    },
    delete: function(req, res) {
        user.UserType.findOne({ _id: req.params.id }, function(err, user) {
            if (err) {
                res.json({error: 'User not found.'});
            } else {
                contact.remove(function(err, user){
                    res.json(200, {status: 'Success'});
                })
            }
        });
    }
};
