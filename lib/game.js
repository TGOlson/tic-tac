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
      _this.play(value);
      _this.board.print();

      value = value === 'X' ? 'O' : 'X';
  }, 500);

};

Game.prototype.play = function(value) {
  var x = Math.floor(Math.random() * 3),
      y = Math.floor(Math.random() * 3);

  this.board.markCell(x, y, value);
  console.log('playing');
};

module.exports = Game;
