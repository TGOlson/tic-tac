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

  this.eachRow(this.cells, function(row, y) {
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
    return cell.value;
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

Board.prototype.eachRow = function(collection, callback) {
  callback = makeCallback(callback);

  _.each(collection, callback);
};

Board.prototype.eachRow = function(collection, callback) {
  callback = makeCallback(callback);

  _.each(collection, callback);
};

Board.prototype.eachColumn = function(collection, callback) {
  callback = makeCallback(callback);

  var columns = [];

  this.eachRow(collection, function(row, y) {
    _.each(row, function(item, x) {
      columns[x] = columns[x] || [];

      columns[x][y] = item;
    });
  });

  _.each(columns, callback);
};

// Board.prototype.collectionClaimed = function(collection) {

// };

Board.prototype.hasWinner = function() {
  var values = this.getValues(),
      hasWinner = false;

  this.eachRow(values, function(row) {
    var unique = _.unique(row);

    if(unique.length === 1 && unique[0]) {
      hasWinner = true;
    }
  });

  this.eachColumn(values, function(column) {
    var unique = _.unique(column);

    if(unique.length === 1 && unique[0]) {
      hasWinner = true;
    }
  });

  // var valueSets = {};

  // this.iterate(function(cell, x, y) {
  //   valueSets[cell.value] = valueSets[cell.value] || {row: {}, col: {}, diag: {}};

  //   var set = valueSets[cell.value];

  //   set.row



  // });
  // if(_.unique())

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

// 1 2 3
// 1 4 7
// 1 5 9

// 0,0 1,0 2,0
// 0,1 1,1 2,1
// 0,2 1,2 2,2
