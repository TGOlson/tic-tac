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
      var move = this.makeNextMove(value);

      this.print();

      if(this.wasWinningMove(move)) {
        clearInterval(intervalId);
      }

      value = value === 'X' ? 'O' : 'X';
  }.bind(this), 500);

};

Game.prototype.print = function() {
  this.board.print();
};

Game.prototype.makeNextMove = function(value) {
  var cell = this.getRandomOpenCell();

  // clean up this smurfing
  cell.cell.setValue(value);

  return cell;
};

Game.prototype.getRandomOpenCell = function() {
  var cell = this.getRandomCell();

  while(cell.isClaimed) {
    cell = this.getRandomCell();
  }

  return cell;
};

Game.prototype.getRandomCell = function() {
  var rowNum = utils.randomInteger(2),
      colNum = utils.randomInteger(2),
      cell = this.board.getCell(rowNum, colNum);

  return {
    cell: cell,
    isClaimed: this.cellIsClaimed(cell),
    row: rowNum,
    col: colNum
  };
};

Game.prototype.cellIsClaimed = function(cell) {
  return cell.getValue() !== null;
};

Game.prototype.wasWinningMove = function(move) {
  var isWinner;

  isWinner = this.collectionClaimed(this.board.getRow(move.row));
  console.log('row', isWinner);

  isWinner = isWinner || this.collectionClaimed(this.board.getColumn(move.col));
  console.log('column', isWinner);

  // if(move)

  isWinner = isWinner || this.collectionClaimed(this.board.getDiagonal(1));
  isWinner = isWinner || this.collectionClaimed(this.board.getDiagonal(-1));
  console.log('diagonal', isWinner);

  return isWinner;
};

Game.prototype.collectionClaimed = function(collection) {
  var values = _.map(collection, function(cell) {
    return cell.getValue();
  });

  return utils.arrayHasSingleTruthyValue(values);
};



module.exports = Game;
