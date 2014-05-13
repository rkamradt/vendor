var should = require('should');
var models = require('../app/models');


describe('Item', function(){
    
  var item;
  before(function(){
    item = models.createItem('test', 'description', 13, 0.10);
  });
  describe('#createItem()', function(){
    it('should be named test', function(){
      item._name.should.equal('test');
    });
    it('should have a description of descripton', function(){
      item._description.should.equal('description');
    });
    it('should have a price of 13', function(){
      item._price.should.equal(13);
    });
    it('should have a quantity discount of 10%', function(){
      item._qtyDisc.should.equal(0.10);
    });
  });
  describe('#getPrice()', function(){
    it('should cost 26 for 2', function() {
        item.getPrice(2).should.equal(26);
    });
    it('should cost 117for 9', function() {
        item.getPrice(9).should.equal(117);
    });
    it('should cost 100 for 10', function() {
        item.getPrice(10).should.equal(117);
    });
    it('should cost 128.7 for 11', function() {
        item.getPrice(11).should.equal(128.7);
    });
    
  });
});
    
