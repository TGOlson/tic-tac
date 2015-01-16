function Player(marker, isAI) {
  this.marker = marker;
  this.isWinner = false;
  this.isAI = isAI || false;
}

module.exports = Player;
