var _ = require('lodash');

function Cell() {
  this.owner = null;

  Object.defineProperty(this, 'isClaimed', {
    get: function() {
      return !_.isNull(this.owner);
    }
  });
}

Cell.prototype.claim = function(player) {
  this.owner = player;
  return this;
};

module.exports = Cell;
