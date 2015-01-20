function Player(marker, isAI) {
  this.marker = marker;
  this.isAI = isAI || false;

  this.isWinner = false;
}

// Player.prototype.

module.exports = Player;
