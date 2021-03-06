var assert = require("assert");


var myStepDefinitionsWrapper = function () {
  this.World = require("../support/world.js").World; // overwrite default World constructor



    this.Given(/^That I am logged in as an administrator$/, function (callback) {
      var b = this.browser
      this.browser.visit("http://localhost:5000/#logon").then(function() {
        assert.ok(b.success, "Errors reported:", b.errors);
        assert.equal(b.text("title"), "Admin Logon");
        // Fill email, password and submit form
        b.fill("userid", "admin").
          fill("password", "admin123").
          pressButton("Submit", function() {
    
          // Form submitted, new page loaded.
          assert.ok(b.success);
          assert.equal(b.text("title"), "Vendor App");
          callback();
        });
      }).fail(function(error) {
          assert.fail(error);
      });
    });
    this.Given(/^that I am on the add item action$/, function (callback) {
      var b = this.browser
      this.browser.clickLink("Add Item").then(function() {
          assert.ok(b.success, "Errors reported:" + b.errors);
          assert.equal(b.text("title"), "Add Item");
          callback();
      });
    });
    
    this.Given(/^that I am on the add bulk item action$/, function (callback) {
      var b = this.browser
      this.browser.clickLink("Add Bulk Items").then(function() {
          assert.ok(b.success, "Errors reported:", b.errors);
          assert.equal(b.text("title"), "Add Bulk Items");
          callback();
      });
    });
    
    this.Given(/^that I am on the modify item action$/, function (callback) {
      var b = this.browser
      this.browser.clickLink("Modify Item").then(function() {
          assert.ok(b.success, "Errors reported:", b.errors);
          assert.equal(b.text("title"), "Modify Item");
          callback();
      });
    });
    
    this.Given(/^that I am on the delete item action$/, function (callback) {
      var b = this.browser
      this.browser.clickLink("Delete Item").then(function() {
          assert.ok(b.success, "Errors reported:", b.errors);
          assert.equal(b.text("title"), "Delete Item");
          callback();
      });
    });
    
    this.Given(/^that I am on the list Items action$/, function (callback) {
      var b = this.browser
      this.browser.clickLink("List Items").then(function() {
          assert.ok(b.success, "Errors reported:", b.errors);
          assert.equal(b.text("title"), "List Items");
          callback();
      });
    });

    this.When(/^I add an item to the catalog$/, function (callback) {
      var b = this.browser
      this.browser.fill("additem", "zombie blood").
        fill("adddescription", "blood of the undead").
        pressButton("Submit", function() {
    
          // Form submitted, new page loaded.
          assert.ok(b.success, "Errors reported:", b.errors);
          assert.equal(b.text("title"), "Admin Page");
          callback();
      });
    });
    
    this.When(/^I add a list of items to the catalog$/, function (callback) {
      var b = this.browser
      this.browser.fill("bulkadditem", "zombie gore-the gore of the undead,zombie brains-the missing piece").
        pressButton("Submit", function() {
    
          // Form submitted, new page loaded.
          assert.ok(b.success, "Errors reported:", b.errors);
          assert.equal(b.text("title"), "Admin Page");
          callback();
      });
    });
        
    this.When(/^I update an item in the catalog$/, function (callback) {
      var b = this.browser
      this.browser.fill("moditem", "zombie blood").
        fill("moddescription", "zombie blood").
        pressButton("Submit", function() {
    
          // Form submitted, new page loaded.
          assert.ok(b.success, "Errors reported:", b.errors);
          assert.equal(b.text("title"), "Admin Page");
          callback();
      });
    });
    
    this.When(/^I delete an item in the catalog$/, function (callback) {
      var b = this.browser
      this.browser.fill("delitem", "zombie blood").
        pressButton("Submit", function() {
    
          // Form submitted, new page loaded.
          assert.ok(b.success, "Errors reported:", b.errors);
          assert.equal(b.text("title"), "Admin Page");
          callback();
      });
    });
    
    this.Given(/^the item already exists$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    this.Given(/^the item does not exist$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });

    this.Then(/^the item shall be stored in the catalog$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
        
    this.Then(/^an error code should be returned$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^the new item shall be saved in the catalog$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^the items shall be stored in the catalog$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^a list of additions and modifications should be returned$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^the item shall be marked as deleted$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for a list of purchase orders$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^I should receive a list of outstanding purchase orders$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Given(/^I have shipped an item to a client$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I update the purchse order to with the new status$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^the new status should be stored$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Given(/^I have shipped the last item of a purchase order$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I update the purchase order with the new status$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^the purchase order shall be marked as closed$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Given(/^that I have logged on to the vendor$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for the current catalog$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^the current catalog should be returned$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Given(/^that I have lo logged on to the vendor$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for the details of an existing item$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^the details of the current item should be returned$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for the details of an non\-existent item$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for the changes since a certain date$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^I should be return a list of adds, deletes and modfications to the catalog$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Given(/^I have an account in good standing$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I submit a purchase order$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^I should receive a tracking number for the purchase order$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Given(/^I have a tracking number for a purchase order$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for the status of the purchase order$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^I should receive the status of the purchase order$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for the purchase order to be canceled$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^the purchase order shall be cancelled$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for a list of outstanding purchase orders$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^I should receive a list of purchase orders$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for a list of completed purchase orders$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^I should receive a list of completed purchase orders$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Given(/^I am logged on as an shipper$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.When(/^I ask for a list of shippable items$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
    
    this.Then(/^I should receive a list of shippable items$/, function (callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
};
    
module.exports = myStepDefinitionsWrapper;
