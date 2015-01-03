// third-party dependencies
var _ = require('lodash');

// internal dependencies
var Cell = require('./cell');

function Board(size) {
  this.size = size || 3;

  this.generateCells();
}

Board.prototype.generateCells = function() {
  this.cells = [];

  for(var i = 0; i < this.size; i++) {
    var cellRow = [];

    for(var j = 0; j < this.size; j++) {
      var cell = this.createCell();
      cellRow.push(cell);
    }

    this.cells.push(cellRow);
  }
};

Board.prototype.createCell = function() {
  return new Cell();
};

Board.prototype.iterate = function(callback) {
  callback = makeCallback(callback);

  this.eachRow(function(row, y) {
    _.each(row, function(cell, x) {
      callback(cell, x, y);
    });
  });
};

Board.prototype.map = function(callback) {
  var collection = [];

  callback = makeCallback(callback);

  this.iterate(function(cell, x, y) {
    collection[y] = collection[y] || [];
    collection[y][x] = callback(cell, x, y);
  });

  return collection;
};

Board.prototype.getValues = function() {
  return this.map(function(cell) {
    return cell.getValue();
  });
};

Board.prototype.print = function() {
  var values = this.map(function(cell) {
    return cell.value || '-';
  });

  values = _.map(values, function(valueSet) {
    return valueSet.join(' ');
  }).join('\n');

  console.log(values);
};

Board.prototype.eachRow = function(callback) {
  callback = makeCallback(callback);

  _.each(this.cells, function(row, i) {
    callback(row, i);
  });
};

Board.prototype.eachColumn = function(callback) {
  var columns = [];

  callback = makeCallback(callback);

  this.iterate(function(cell, x, y) {
    columns[x] = columns[x] || [];
    columns[x][y] = cell;
  });

  // passing the named callback function breaks tests for some reason
  // instead, pass anonymous function that invokes callback
  _.each(columns, function(column, i) {
    callback(column, i);
  });
};

Board.prototype.eachDiagonal = function(callback) {

  // assume only two diagonals exist
  // boards can only be squares
  var diagonals = [[], []],
      _this = this;

  callback = makeCallback(callback);

  this.eachRow(function(row, y) {

    // collect the diagonal starting at top left and moving to bottom right
    diagonals[0].push(row[y]);

    // collect the diagonal starting at top right and moving to bottom left
    diagonals[1].push(row[_this.size - 1 - y]);
  });

  // passing the named callback function breaks tests for some reason
  // instead, pass anonymous function that invokes callback
  _.each(diagonals, function(diagonal, i) {
    callback(diagonal, i);
  });
};

Board.prototype.collectionClaimed = function(collection) {
  var values = _.map(collection, function(cell) {
    return cell.getValue();
  });

  var unique = _.unique(values);

  return !!(unique.length === 1 && unique[0]);
};

Board.prototype.hasWinner = function() {
  var hasWinner = false,
      _this = this,
      checks = [
        'eachRow',
        'eachColumn',
        'eachDiagonal'
      ];

  // TODO - add early exits if hasWinner is true from early checks
  _.each(checks, function(check) {
    fn = _this[check].bind(_this);

    fn(function(collection) {
      if(_this.collectionClaimed(collection)) {
        hasWinner = true;
      }
    });
  });

  return hasWinner;
};

function makeCallback(fn) {
  return fn || noop;
}

function noop() {}

new Board().print();

module.exports = Board;


// 1 2 3
// 4 5 6
// 7 8 9

// 0 1 2
// 3 4 5
// 6 7 8

// 1 2 3
// 1 4 7
// 1 5 9

// 0,0 1,0 2,0
// 0,1 1,1 2,1
// 0,2 1,2 2,2
