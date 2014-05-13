var mongoose = require('mongoose'),
    md5 = require('MD5'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ItemType = new Schema({
    name:      { type: String },
    description: { type: String },
    price:     { type: Number },
    qtyDisc:   { type: Number }
});

function Item() {
    return {
        _name: '',
        _description: '',
        _price: 1,
        _qtyDisc: 0,
        createItem: function(name, desc, price, qtyDisc) {
            this._name = name;
            this._description = desc;
            this._price = price;
            this._qtyDisc = qtyDisc;
        },
        getPrice:   function(qty) {
            var ret = this._price*qty;
            if(qty >= 10) {
                var disc = this._qtyDisc * ret;
                ret -= disc;
            }
            return ret;
        }
    };
};

var UserType = new Schema({
    email:      { type: String },
    emailverifiied: { type: Boolean },
    name: {
        first:  { type: String },
        last:   { type: String }
    },
    phone:      { type: String },
    gravatar:   { type: String },
    userid:     { type: String },
    password:   { type: String },
    role:       { type: String }
});

function User() {
    return {
        _email: "",
        _emailverified: false,
        _lastname: "",
        _firstname: "",
        _phone: "",
        _gravitar: "",
        _userid: "",
        _password: "",
        _role: "",
        createUser: function(email, lastname, firstname, phone, userid, password) {
            if(!email || !userid || !password) {
                throw 'email, userid, and password are required to create a user';
            }
            this._email = email;
            this._lastname = lastname;
            this._firstname = firstname;
            this._phone = phone;
            this._userid = userid;
            this._password = md5(password);
            this._emailverified = false;
            this._role = 'nobody';
        },
        createSuperUser: function(domain) { // create an initial user
            this._email = 'super@' + domain;
            this._userid = 'admin';
            this._password = md5('admin123');
            this._role = 'super';  // can do anything
        },
        isInRole: function(role) {
            var r = role;
            return this._role.split(',').some(function(elem) {
                if(elem == r) {
                    return true;
                }
                return false;
            });        
        },
        addRole: function(role) {
            if(this._role == 'nobody') { // no longer nobody, better remove it
                this._role = '';
            }
            if(this._role) {
                this._role += ',';
            }
            this._role += role;
        },
        removeRole: function(role) {
            if(this._role == role) {
                this._role = 'nobody';
                return;
            }
            this._role = this._role.replace(role+',', '');
            this._role = this._role.replace(','+role, '');
        }
    };
};


module.exports = {
    ItemType: mongoose.model('ItemType', ItemType),
    UserType: mongoose.model('UserType', UserType),
    createItem: function(name, desc, price, qtyDisc) { 
        var ret = Item();
        ret.createItem(name, desc, price, qtyDisc);
        return ret;
    },
    createUser: function(email, lastname, firstname, phone, userid, password) {
        var ret = User();
        ret.createUser(email, lastname, firstname, phone, userid, password);
        return ret;
    },
    createSuperUser: function(domain) {
        var ret = User();
        ret.createSuperUser(domain);
        return ret;
    }
};
