var mongoose = require('mongoose'),
    userClass = require('./models/user'),
    md5 = require('MD5');

module.exports = {
    check: function() {
        userClass.findAll(function(err, users) {
            if (users.length === 0) {
                console.log('no contacts found, adding super user');
                var newUser = new userClass.createSuperUser('test.com');
                newUser.save(function(err, user) {
                    console.log('successfully inserted contact: ' + user._id);
                });

            } else {
                console.log('found ' + users.length + ' existing contacts!');
            }
        });
    }
};
