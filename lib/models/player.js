var _ = require('lodash');

/*
 * Constants
 */
var DEFAULT_PLAYER_OPTIONS = {
  isAI: true
};

function Player(options) {
  if(!options.marker) {
    throw new Error('Cannot create player without marker.');
  }

  _.defaults(options, DEFAULT_PLAYER_OPTIONS);

  this.marker = options.marker;
  this.isAI = options.isAI;

  this.isWinner = false;
}

module.exports = Player;
