var _ = require('lodash');

var Board = require('./board'),
    utils = require('./utils'),
    Player = require('./player'),
    randomStrategy = require('./strategies/random');

function Game(options) {

  // TODO: use defaults here
  // take in player markers and strategy
  options = options || {};

  this.players = [
    new Player('X'),
    new Player('O')
  ];

  this.board = new Board();
  this.start();

  this.use(randomStrategy);
}

Game.prototype.use = function(strategy) {

  // TODO: clean up strategy invocation
  this.getNextMove = strategy.bind(null, this.board);
};

Game.prototype.start = function() {
  this.currentTurn = this.players[0];

  var intervalId = setInterval(function() {
    var move = this.makeNextMove(this.currentTurn);

    this.print();

    if(move.isWinningMove) {
      clearInterval(intervalId);
    }

    this.togglePlayerTurn();
  }.bind(this), 500);

};

Game.prototype.togglePlayerTurn = function() {
  this.currentTurn = this.players[0] === this.currentTurn ? this.players[1] : this.players[0];
};

Game.prototype.print = function() {
  this.board.print();
};

Game.prototype.getNextMove = function(player) {
  throw new Error('No strategy in use for game play');
};

Game.prototype.makeNextMove = function(player) {

  // this uses the strategy the game was initialized with
  var move = this.getNextMove(this.board);

  // TODO: check if move is legal (not overwriting a previous move) before submitting

  move.cell.claim(player);

  move.isWinningMove = this.isWinningMove(move.row, move.col);

  return move;
};

Game.prototype.cellIsClaimed = function(cell) {
  return cell.isClaimed;
};

Game.prototype.isWinningMove = function(rowNum, colNum) {
  var isWinner;

  isWinner = this.collectionClaimed(this.board.getRow(rowNum));

  if(!isWinner) isWinner = this.collectionClaimed(this.board.getColumn(colNum));
  if(!isWinner) isWinner = this.collectionClaimed(this.board.getDiagonal(1));
  if(!isWinner) isWinner = this.collectionClaimed(this.board.getDiagonal(-1));

  return isWinner;
};

Game.prototype.collectionClaimed = function(collection) {
  var values = _.map(collection, 'owner');
  return utils.arrayHasSingleTruthyValue(values);
};



module.exports = Game;
