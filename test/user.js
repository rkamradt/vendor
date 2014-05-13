var should = require('should');
var models = require('../app/models');
var md5 = require('MD5');


    
describe('User', function(){
    
  var user;
  before(function(){
    user = models.createUser('test@info.com', 'lastname', 'firstname', '123-123-1234', 'userid', 'password');
  });
  describe('#createUser', function(){
    it('email should be test@info.com', function(){
      user._email.should.equal('test@info.com');
    });
    it('lastname should be lastname', function(){
      user._lastname.should.equal('lastname');
    });
    it('firstname should be firstname', function(){
      user._firstname.should.equal('firstname');
    });
    it('phone should be 123-123-1234', function(){
      user._phone.should.equal('123-123-1234');
    });
    it('userid should be userid', function(){
      user._userid.should.equal('userid');
    });
    it('password should be ' + md5('password'), function(){
      user._password.should.equal(md5('password'));
    });
    it('role should be nobody', function(){
      user._role.should.equal('nobody');
    });
    it('verified email should be false', function(){
      user._emailverified.should.be.false;
    });
  });
  describe('#removeRole', function(){
    it('role should be nobody', function() {
      user.addRole('somebody');
      user.removeRole('somebody');
      user._role.should.equal('nobody');
    }); 
  });
  describe('#addRole', function(){
    it('role should be somebody', function() {
      user.addRole('somebody');
      user._role.should.equal('somebody');
      user.removeRole('somebody');
    }); 
    it('role should be somebody,bigwheel', function() {
      user.addRole('somebody');
      user._role.should.equal('somebody');
      user.addRole('bigwheel');
      user._role.should.equal('somebody,bigwheel');
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
      user = models.createSuperUser('me.com');
      user._email.should.equal('super@me.com');
    });
    it('lastname should be empty', function(){
      user = models.createSuperUser('me.com');
      user._lastname.should.equal('');
    });
    it('firstname should be empty', function(){
      user = models.createSuperUser('me.com');
      user._firstname.should.equal('');
    });
    it('phone should be empty', function(){
      user = models.createSuperUser('me.com');
      user._phone.should.equal('');
    });
    it('userid should be admin', function(){
      user = models.createSuperUser('me.com');
      user._userid.should.equal('admin');
    });
    it('password should be ' + md5('admin123'), function(){
      user = models.createSuperUser('me.com');
      user._password.should.equal(md5('admin123'));
    });
    it('role should be super', function(){
      user = models.createSuperUser('me.com');
      user._role.should.equal('super');
    });
    it('verified email should be false', function(){
      user = models.createSuperUser('me.com');
      user._emailverified.should.be.false;
    });
  });
});
