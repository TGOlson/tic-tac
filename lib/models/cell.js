var _ = require('lodash');

var utils = require('../utils/utils');

function cell() {
  var _state = {
    value: null
  };

  function getValue() {
    return _state.value;
  }

  function setValue(value) {
    _state.value = value;
  }

  function hasValue() {
    return !_.isNull(getValue());
  }

  return utils.exposeAsPublic([
    getValue,
    setValue,
    hasValue
  ]);
}

module.exports = cell;
