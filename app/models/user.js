var mongoose = require('mongoose'),
    md5 = require('MD5'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    email:      { type: String },
    emailverifiied: { type: Boolean },
    firstname:  { type: String },
    lastname:   { type: String },
    phone:      { type: String },
    gravatar:   { type: String },
    userid:     { type: String },
    password:   { type: String },
    role:       { type: String }
});

UserSchema.methods.setSuperUserValues = function(domain) {
    this.email = 'super@' + domain;
    this.userid = 'admin';
    this.password = 'admin123'; // make sure to tell the user to change this
    this.fixupNewValues();
    this.role = 'super';  // can do anything
    this.emailverified = true; // assume for first user
};

UserSchema.methods.setNewValues = function(email, lastname, firstname, phone, userid, password) {
    if(!email || !userid || !password) {
        throw 'email, userid, and password are required to create a user';
    }
    this.email = email;
    this.lastname = lastname;
    this.firstname = firstname;
    this.phone = phone;
    this.userid = userid;
    this.emailverified = false;
    this.password = password;
    this.fixupNewValues();
};

UserSchema.methods.fixupNewValues = function() {
    this.password = md5(this.password);
    this.gravitar = md5(this.email);
    this.role = 'nobody';
};

UserSchema.methods.isInRole = function(role) {
    var r = role;
    return this.role.split(',').some(function(elem) {
        if(elem == r) {
            return true;
        }
        return false;
    });        
};

UserSchema.methods.addRole = function(role) {
    if(this.role == 'nobody') { // no longer nobody, better remove it
        this.role = '';
    }
    if(this.role) {
        this.role += ',';
    }
    this.role += role;
};

UserSchema.methods.removeRole = function(role) {
    if(this.role == role) {
        this.role = 'nobody';
        return;
    }
    this.role = this.role.replace(role+',', '');
    this.role = this.role.replace(','+role, '');
};

UserSchema.statics.createUser = function(email, lastname, firstname, phone, userid, password) {
    var ret = new userClass;
    ret.setNewValues(email, lastname, firstname, phone, userid, password);
    return ret;
};

UserSchema.statics.createUserFromJSON = function(json, update) {
    var ret = new userClass(json);
    if(!update) {
        ret.fixupNewValues();
    }
    return ret;
};

UserSchema.statics.createSuperUser = function(domain) {
    var ret = new userClass;
    ret.setSuperUserValues(domain);
    return ret;
};

UserSchema.statics.findAll = function(done) {
    this.find(done);
};

UserSchema.statics.findById = function(id, done) {
    this.find({_id: id}, done);
};

var userClass = mongoose.model('userClass', UserSchema);

module.exports = userClass;

