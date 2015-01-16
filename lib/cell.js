function Cell() {
  this.owner = null;
  this.isClaimed = false;
  this.isPartOfWinningSection = false;
}

Cell.prototype.claim = function(player) {
  this.owner = player;
  this.isClaimed = true;

  return this;
};

module.exports = Cell;
