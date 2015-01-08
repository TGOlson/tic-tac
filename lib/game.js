 // third-party dependencies
var _ = require('lodash');

// internal dependencies
var Board = require('./board');

function Game() {
  this.board = new Board();

  this.start();
}

Game.prototype.start = function() {
  var _this = this,
      value = 'X';

  var intervalId = setInterval(function() {
      _this.board.print();
      _this.play(value);

      value = value === 'X' ? 'O' : 'X';

      if(_this.hasWinner()) {
        clearInterval(intervalId);
      }
  }, 500);

};

Game.prototype.play = function(value) {
  var x = Math.floor(Math.random() * 3),
      y = Math.floor(Math.random() * 3);

  this.board.markCell(x, y, value);
  console.log('playing');
};


Game.prototype.hasWinner = function() {
  var hasWinner = false,
      _this = this,
      board = this.board,
      checks = [
        'eachRow',
        'eachColumn',
        'eachDiagonal'
      ];

  // TODO - add early exits if hasWinner is true from early checks
  _.each(checks, function(check) {
    fn = board[check].bind(board);

    fn(function(collection) {
      if(_this.collectionClaimed(collection)) {
        hasWinner = true;
      }
    });
  });

  console.log(hasWinner);

  return hasWinner;
};

Game.prototype.collectionClaimed = function(collection) {
  var values = _.map(collection, function(cell) {
    return cell.getValue();
  });

  var unique = _.unique(values);

  console.log(unique);

  return !!(unique.length === 1 && unique[0]);
};


module.exports = Game;
