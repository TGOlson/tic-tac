var _ = require('lodash');

var Cell = require('./cell'),
    utils = require('../utils/utils');


/*
 * Constants
 */
var DEFAULT_BOARD_SIZE = 3;

function Board(size) {
  this.size = size || DEFAULT_BOARD_SIZE;

  this.cells = this._makeCells();
}

Board.prototype._makeCells = function() {
  return utils.makeArray(this.size).map(this._makeRow.bind(this));
};

Board.prototype._makeRow = function() {
  return utils.makeArray(this.size).map(this._createCell);
};

Board.prototype._createCell = function() {
  return new Cell();
};

Board.prototype.getRow = function(rowNum) {
  return _.clone(this.cells[rowNum]);
};

Board.prototype.getColumn = function(columnNum) {
  return utils.makeArray(this.size).map(function(elem, i) {
    return this.getCell(i, columnNum);
  }.bind(this));
};

Board.prototype.getDiagonal = function(direction) {
  var columnNum = direction === 1 ? 0 : this.size - 1;

  return utils.makeArray(this.size).map(function(elem, i) {
    var cell = this.getCell(i, columnNum);

    columnNum += direction;

    return cell;
  }.bind(this));
};

Board.prototype.getCell = function(rowNum, colNum) {
  var row = this.getRow(rowNum),
      cell;

  if(row) {
    cell = row[colNum];
  }

  // return undefined if no row exists in specified location
  return cell;
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
    console.log(_.map(row, function(cell){
      if(!cell.owner) return '-';
      return cell.owner.marker;
    }).join(' '));
  });

  console.log('\n');
};

module.exports = Board;
