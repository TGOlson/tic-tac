// third-party dependencies
var _ = require('lodash');

// internal dependencies
var Cell = require('./cell'),
    utils = require('./utils');


/*
 * Constants
 */
var DEFAULT_BOARD_SIZE = 3;

function Board(size) {
  this.size = size || DEFAULT_BOARD_SIZE;
  this.cells = this.makeCells();
}

Board.prototype.makeCells = function() {
  return utils.makeArray(this.size).map(this.makeRow.bind(this));
};

Board.prototype.makeRow = function() {
  return utils.makeArray(this.size).map(this.createCell);
};

Board.prototype.createCell = function() {
  return new Cell();
};

Board.prototype.getRow = function(rowNum) {
  return this.cells[rowNum];
};

Board.prototype.getCell = function(rowNum, colNum) {
  var row = this.getRow(rowNum);

  if(row) {
    return row[colNum];
  }

  // return undefined if no row exists in specified location
};

Board.prototype.markCell = function(row, col, value) {
  var cell = this.getCell(row, col);

  if(!cell) {
    throw new Error('Cell does not exists. Cannot mark cell');
  }

  cell.setValue(value);
};

// for debugging
Board.prototype.print = function() {
  _.each(this.cells, function(row) {
    var values = _.map(row, 'value');
    console.log(values);
  });
};

module.exports = Board;
