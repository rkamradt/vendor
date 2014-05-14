var should = require('should');
var items = require('../app/models/item');


describe('Item', function(){
    
  var item;
  var jsonItem;
  var newJsonItem;
  before(function(){
    item = items.createItem('test', 'description', 13, 0.10);
    newJsonItem = items.createItemFromJSON( {
        name: 'test',
        description: 'description',
        price: 13,
        qtyDisc: 0.10
    },false);
    jsonItem = items.createItemFromJSON( {
        name: 'test',
        description: 'description',
        price: 13,
        qtyDisc: 0.10
    },true);
  });
  describe('#createItem()', function(){
    it('should be named test', function(){
      item.name.should.equal('test');
    });
    it('should have a description of descripton', function(){
      item.description.should.equal('description');
    });
    it('should have a price of 13', function(){
      item.price.should.equal(13);
    });
    it('should have a quantity discount of 10%', function(){
      item.qtyDisc.should.equal(0.10);
    });
  });
  describe('#createItemFromJSON(update)', function(){
    it('should be named test', function(){
      jsonItem.name.should.equal('test');
    });
    it('should have a description of descripton', function(){
      jsonItem.description.should.equal('description');
    });
    it('should have a price of 13', function(){
      jsonItem.price.should.equal(13);
    });
    it('should have a quantity discount of 10%', function(){
      jsonItem.qtyDisc.should.equal(0.10);
    });
  });
  describe('#createItemFromJSON(create)', function(){
    it('should be named test', function(){
      newJsonItem.name.should.equal('test');
    });
    it('should have a description of descripton', function(){
      newJsonItem.description.should.equal('description');
    });
    it('should have a price of 13', function(){
      newJsonItem.price.should.equal(13);
    });
    it('should have a quantity discount of 10%', function(){
      newJsonItem.qtyDisc.should.equal(0.10);
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
    
