"use strict";

module.exports = function() {
    var items = { };
    return {
        init: function() {
            items = { };
        },
        createItem: function(n, d) {
            return { name: n, description: d };
        },
        duplicateItem: function(item) {
            var result = { }
            for(var key in items) {
                result[key] = items[key];
            }
            return result;
        },
        addItem: function(item) {
            if(items[item.name]) {
                throw "Item " + item + " exists, cannot add";
            }
            items[item.name] =  { item: item.name, description: item.description }
        },
        addItems: function(itemArrray) {
            itemArray.forEach(function () {
                if(items[item.name]) {
                    throw "Item " + item + " exists, cannot add";
                }
            });
            itemArray.forEach(function () {
                items[item.name] =  { item: item.name, description: item.description }
            });
        },
        modifyItem: function(item) {
            if(!items[item.name]) {
                throw "Item " + item + " does not exist, cannot modify";
            }
            items[item.name] =  { item: item.name, description: item.description }
        },
        deleteItem: function(item) {
            if(!items[item.name]) {
                throw "Item " + item + " does not exist, cannot modify";
            }
            items[item.name] =  { item: item.name, description: item.description }
        },
        itemExists: function(item) {
            if(items[item.name]) {
                return true;
            }
            return false;
        },
        listItems: function() {
            var result = [];
            for(var key in items) {
                result.push(items[key]);
            }
            return result;
        },
        findItem: function(name) {
            return items[name];
        }
    };
}();
    