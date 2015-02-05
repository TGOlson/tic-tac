var _ = require('lodash');

var utils = require('../utils/utils');


/*
 * Constants
 */
var DEFAULT_PLAYER_OPTIONS = {
  isAI: true
};

function player(marker, options) {
  if(_.isUndefined(marker)) {
    throw new Error('Cannot create player without marker.');
  }

  var _state = {
    marker: marker
  };

  _.extend(_state, options, DEFAULT_PLAYER_OPTIONS);

  function getMarker() {
    return _state.marker;
  }

  function isAI() {
    return _state.isAI;
  }

  return utils.exposeAsPublic([
    getMarker,
    isAI
  ]);
}

module.exports = player;
