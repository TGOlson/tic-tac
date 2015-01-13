// third-party dependencies
var _ = require('lodash');

var utils = {};

// TODO: test this
utils.makeArray = function(size) {
  var array = [];

  _.times(size, function() {
    array.push(null);
  });

  return array;
};

utils.randomInteger = function(max) {
  return Math.floor(Math.random() * (max + 1));
};

utils.noop = function() {};

module.exports = utils;
