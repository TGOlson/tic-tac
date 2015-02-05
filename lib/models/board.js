var _ = require('lodash');

var cell = require('./cell'),
    utils = require('../utils/utils');


/*
 * Constants
 */
var DEFAULT_BOARD_SIZE = 3;

function Board(size) {
  var _state = {

    size: size || DEFAULT_BOARD_SIZE,
    cells: null
  };

  this._state = _state;

  this._state.cells = this._makeCells();

}

Board.prototype._makeCells = function() {
  return utils.makeArray(this._state.size, this._makeRow.bind(this));
};

Board.prototype._makeRow = function() {
  return utils.makeArray(this._state.size, this._createCell);
};

Board.prototype._createCell = function() {
  return cell();
};

Board.prototype.getRow = function(rowNum) {
  return _.clone(this._state.cells[rowNum]);
};

Board.prototype.getColumn = function(columnNum) {
  return utils.makeArray(this._state.size, function(i) {
    return this.getCell(i, columnNum);
  }.bind(this));
};

Board.prototype.getDiagonals = function(rowNum, colNum) {
  var directions = {
    diagonalPos: null,
    diagonalNeg: null
  };

  if(rowNum === colNum) {
    directions.diagonalPos = 1;
  }

  if(rowNum + colNum === this._state.size - 1) {
    directions.diagonalNeg = -1;
  }

  return _.mapValues(directions, this.getDiagonal.bind(this));
};

Board.prototype.getDiagonal = function(direction) {
  var columnNum = direction === 1 ? 0 : this._state.size - 1;

  return utils.makeArray(this._state.size, function(i) {
    var cell = this.getCell(i, columnNum);

    columnNum += direction;

    return cell;
  }.bind(this));
};

Board.prototype.getCrossSections = function(rowNum, colNum) {
  var sections = {
    row: this.getRow(rowNum),
    col: this.getColumn(colNum)
  };

  // extend section data with diagonals
  // this allows section data to only contain diagonals if the row/col combo is part of one
  return _.extend(sections, this.getDiagonals(rowNum, colNum));
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

Board.prototype.map = function(callback) {
  return _.map(this._state.cells, function(row, rowNum) {
    return _.map(row, callback);
  });
};

module.exports = Board;
