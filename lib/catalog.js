"use strict";

const mongojs = require('mongojs'),
    db = mongojs('vendordb'),
    Q = require('q');

module.exports = function() {
    var collection = db.collection('catalog');
    return {
        create: function() {
        },
        createItem: function(n, d) {
            return { name: n, description: d };
        },
        duplicateItem: function(item) {
            var result = { }
            for(var key in item) {
                result[key] = item[key];
            }
            return result;
        },
        addItem: function(item) {
            collection.save(item);
        },
        addItems: function(itemArrray) {
            itemArray.forEach(function (item) {
                this.addItem(item);
            });
        },
        modifyItem: function(item) {
            collection.findAndModify({
                query: { name: item.name },
                update: { $set: { description:item.description } },
                new: true
            });
        },
        deleteItem: function(item) {
            collection.remove(item);
        },
        itemExists: function(item) {
            return this.findItem(item);
        },
        listItems: function() {
            let deferred = Q.defer();  
            collection.find(function(err, docs) {
              if (err) {
                deferred.reject(err);  
              } else {
                deferred.resolve([docs]);  
              }
            });
            deferred.promise.then(function(args) {  
              return args[0];
            }, function(err) {  
              return [];
            });
        },
        findItem: function(name) {
            let deferred = Q.defer();  
            collection.findOne({
                name: name
            }, function(err, doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve([doc]);
                }
            });
            deferred.promise.then(function(args) {
                return args[0];
            }, function(err) {
                console.log("in findItem returned " + err);
            });
        }
    };
}();
    