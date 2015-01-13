 // third-party dependencies
var _ = require('lodash');

// internal dependencies
var Board = require('./board'),
    utils = require('./utils');

function Game() {
  this.board = new Board();
  this.start();
}

Game.prototype.start = function() {
  var _this = this,
      value = 'X';

  var intervalId = setInterval(function() {
      this.play(value);
      this.print();

      value = value === 'X' ? 'O' : 'X';
  }.bind(this), 500);

};

Game.prototype.print = function() {
  this.board.print();
};

Game.prototype.play = function(value) {
  this.getRandomOpenCell().setValue(value);
};

Game.prototype.getRandomOpenCell = function() {
  var cell = this.getRandomCell();

  while(this.cellIsClaimed(cell)) {
    cell = this.getRandomCell();
  }

  return cell;
};

Game.prototype.getRandomCell = function() {
  var rowNum = utils.randomInteger(2),
      colNum = utils.randomInteger(2);

  return this.board.getCell(rowNum, colNum);
};

Game.prototype.cellIsClaimed = function(cell) {
  return cell.getValue() !== null;
};

module.exports = Game;
