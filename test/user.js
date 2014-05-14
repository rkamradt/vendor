var should = require('should');
var users = require('../app/models/user');
var md5 = require('MD5');


    
describe('User', function(){
    
  var user;
  var jsonUser;
  var newJsonUser;
  var superUser;
  before(function(){
    user = users.createUser('test@info.com', 'lastname', 'firstname', '123-123-1234', 'userid', 'password');
    newJsonUser = users.createUserFromJSON( {
        email: 'test@info.com',
        lastname: 'lastname',
        firstname: 'firstname',
        phone:'123-123-1234',
        userid: 'userid',
        password: 'password',
        role: 'nobody',
    }, false);
    jsonUser = users.createUserFromJSON( {
        email: 'test@info.com',
        lastname: 'lastname',
        firstname: 'firstname',
        phone:'123-123-1234',
        userid: 'userid',
        password: md5('password'),
        emailverified: true,
        gravitar: md5('test@info.com'),
        role: 'somebody'
    }, true);
    superUser = users.createSuperUser('me.com');

  });
  describe('#createUser', function(){
    it('email should be test@info.com', function(){
      user.email.should.equal('test@info.com');
    });
    it('lastname should be lastname', function(){
      user.lastname.should.equal('lastname');
    });
    it('firstname should be firstname', function(){
      user.firstname.should.equal('firstname');
    });
    it('phone should be 123-123-1234', function(){
      user.phone.should.equal('123-123-1234');
    });
    it('userid should be userid', function(){
      user.userid.should.equal('userid');
    });
    it('password should be ' + md5('password'), function(){
      user.password.should.equal(md5('password'));
    });
    it('role should be nobody', function(){
      user.role.should.equal('nobody');
    });
  });
  describe('#createUserFromJSON(create)', function(){
    it('email should be test@info.com', function(){
      newJsonUser.email.should.equal('test@info.com');
    });
    it('lastname should be lastname', function(){
      newJsonUser.lastname.should.equal('lastname');
    });
    it('firstname should be firstname', function(){
      newJsonUser.firstname.should.equal('firstname');
    });
    it('phone should be 123-123-1234', function(){
      newJsonUser.phone.should.equal('123-123-1234');
    });
    it('userid should be userid', function(){
      newJsonUser.userid.should.equal('userid');
    });
    it('password should be ' + md5('password'), function(){
      newJsonUser.password.should.equal(md5('password'));
    });
    it('role should be nobody', function(){
      newJsonUser.role.should.equal('nobody');
    });
  });
  describe('#createUserFromJSON(update)', function(){
    it('email should be test@info.com', function(){
      jsonUser.email.should.equal('test@info.com');
    });
    it('lastname should be lastname', function(){
      jsonUser.lastname.should.equal('lastname');
    });
    it('firstname should be firstname', function(){
      jsonUser.firstname.should.equal('firstname');
    });
    it('phone should be 123-123-1234', function(){
      jsonUser.phone.should.equal('123-123-1234');
    });
    it('userid should be userid', function(){
      jsonUser.userid.should.equal('userid');
    });
    it('password should be ' + md5('password'), function(){
      jsonUser.password.should.equal(md5('password'));
    });
    it('role should be somebody', function(){
      jsonUser.role.should.equal('somebody');
    });
  });
  describe('#removeRole', function(){
    it('role should be nobody', function() {
      user.addRole('somebody');
      user.removeRole('somebody');
      user.role.should.equal('nobody');
    }); 
  });
  describe('#addRole', function(){
    it('role should be somebody', function() {
      user.addRole('somebody');
      user.role.should.equal('somebody');
      user.removeRole('somebody');
    }); 
    it('role should be somebody,bigwheel', function() {
      user.addRole('somebody');
      user.role.should.equal('somebody');
      user.addRole('bigwheel');
      user.role.should.equal('somebody,bigwheel');
      user.removeRole('somebody');
      user.removeRole('bigwheel');
    });
  });
  describe('#isInRole', function() {
    it('should have the roles assigned to it', function() {
        user.addRole('somebody');
        user.addRole('bigwheel');
        user.isInRole('somebody').should.be.true;
        user.isInRole('bigwheel').should.be.true;
        user.isInRole('nobody').should.be.false;
        user.removeRole('somebody');
        user.removeRole('bigwheel');
    });
  });
  describe('#createSuperUser()', function(){
    it('should have an email of super@me.com', function(){
      superUser.email.should.equal('super@me.com');
    });
    it('userid should be admin', function(){
      superUser.userid.should.equal('admin');
    });
    it('password should be ' + md5('admin123'), function(){
      superUser.password.should.equal(md5('admin123'));
    });
    it('role should be super', function(){
      superUser.role.should.equal('super');
    });
    it('verified email should be true', function(){
      superUser.emailverified.should.be.true;
    });
  });
});
