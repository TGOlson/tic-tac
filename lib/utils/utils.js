var _ = require('lodash');

var utils = {};

utils.makeArray = function(size, defaultValue) {
  var array = [],
      value = defaultValue || null;

  _.times(size, function(i) {
    if(_.isFunction(defaultValue)) {
      value = defaultValue(i);
    }

    array.push(value);
  });

  return array;
};

utils.flatMap = function(collection, callback) {
  return _.map(_.flatten(collection), callback);
};

utils.arrayHasOneTruthyValue = function(array) {
  var uniques = _.unique(array);
  return uniques.length === 1 && !!uniques[0];
};

utils.randomInteger = function(max) {
  return Math.floor(Math.random() * (max + 1));
};

utils.exposeAsPublic = function(fns) {
  return _.zipObject(_.map(fns, 'name'), fns);
};

utils.noop = function() {};

module.exports = utils;
