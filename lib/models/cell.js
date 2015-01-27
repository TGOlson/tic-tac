var _ = require('lodash');

function Cell() {
  this.owner = null;

  Object.defineProperty(this, 'isClaimed', {
    get: function() {
      return !_.isNull(this.owner);
    }
  });

  Object.defineProperty(this, 'value', {
    get: function() {
      if(this.isClaimed) {
        return this.owner.marker;
      } else {
        return '-';
      }
    }
  });
}

Cell.prototype.claim = function(player) {
  this.owner = player;
  return this;
};

module.exports = Cell;
