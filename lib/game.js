var _ = require('lodash');

var Board = require('./board'),
    utils = require('./utils'),
    Player = require('./player'),
    randomStrategy = require('./strategies/random');

function Game(options) {

  options = options || {};

  _.defaults(options, {
    size: 3,
    player1: new Player('X', true),
    player2: new Player('O', true),
    strategy: randomStrategy
  });

  _.extend(this, options);

  this.players = [
    this.player1,
    this.player2
  ];

  this.moves = 0;

  this.board = new Board(this.size);
  this.start();

  this.use(this.strategy);
}

Game.prototype.use = function(strategy) {

  // TODO: clean up strategy invocation
  this.getNextAIMove = strategy.bind(null, this.board);
};

Game.prototype.start = function() {
  this.currentTurn = this.players[0];

  var intervalId = setInterval(function() {
    var move = this.makeNextMove(this.currentTurn);

    this.print();

    if(move.isWinningMove) {
      console.log(this.currentTurn.marker, ' Wins!');
      clearInterval(intervalId);
    }

    if(this.isCatsGame()) {
      console.log('Cat\'s Game!');
      clearInterval(intervalId);
    }

    this.togglePlayerTurn();
  }.bind(this), 500);

};

Game.prototype.isCatsGame = function() {
  return this.moves === this.size * this.size;
};

Game.prototype.togglePlayerTurn = function() {
  this.currentTurn = this.players[0] === this.currentTurn ? this.players[1] : this.players[0];
};

Game.prototype.print = function() {
  this.board.print();
};

Game.prototype.getNextAIMove = function(player) {
  throw new Error('No strategy in use for AI moves');
};

Game.prototype.makeNextMove = function(player) {
  var move;

  if(player.isAI) {
    move = this.getNextAIMove(this.board);
  } else {
    // move = // wait for player to make a move
    throw new Error('Not accepting live player moves');
  }

  // TODO: check if move is legal (not overwriting a previous move) before submitting
  this.moves++;
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
