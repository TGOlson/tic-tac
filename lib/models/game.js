var _ = require('lodash');

var Board = require('./board'),
    Player = require('./player'),
    utils = require('../utils/utils');

/*
 * Constants
 */
var DEFAULT_GAME_OPTIONS = {
  size: 3,
  player1: {
    marker: 'X',
    isAI: true
  },
  player2: {
    marker: 'O',
    isAI: true
  },
  strategy: 'random'
};

function Game(options) {
  options = options || {};

  _.defaults(options, DEFAULT_GAME_OPTIONS);

  this.players = [
    new Player(options.player1),
    new Player(options.player2)
  ];

  this.moves = 0;

  this.board = new Board(options.size);

  this.use(options.strategy);
}

Game.prototype.use = function(strategyId) {
  var strategy = require('../strategies/' + strategyId);

  if(!strategy) {
    throw new Error('Unknown strategy type.');
  }

  // TODO: clean up strategy invocation
  this.getNextAIMove = function(game) {
    return strategy(game);
  };

  return this;
};

Game.prototype.render = utils.noop;

Game.prototype.onRender = function(callback) {
  this.render = callback.bind(this);
  return this;
};

Game.prototype.start = function() {
  this.currentTurn = this.players[0];

  var intervalId = setInterval(function() {
    var move = this.makeNextMove(this.currentTurn);

    this.render();

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

Game.prototype.getNextAIMove = function(player) {
  throw new Error('No strategy in use for AI moves');
};

Game.prototype.makeNextMove = function(player) {
  var move;

  if(player.isAI) {
    move = this.getNextAIMove(this);
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
  var sections = this.board.getCrossSections(rowNum, colNum);
  return _.find(sections, this.collectionClaimed);
};

Game.prototype.collectionClaimed = function(collection) {
  var values = _.map(collection, 'owner');
  return utils.arrayHasOneTruthyValue(values);
};


module.exports = Game;
