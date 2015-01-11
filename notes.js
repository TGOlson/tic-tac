var _ = require('lodash');

var SIZE = 3;

var board = [];

for(var i = 0; i < SIZE * SIZE; i++) {
  board.push('c' + i);
}

function createBoardIterator(groupPattern) {
  return function(callback) {
    var groups = _.groupBy(board, groupPattern);
    // groups = _.filter(groups, undefined);

    // remove any values where the key is undefined
    // this means the group pattern returned undefined
    // by iterator definition, these must not be iterated upon
    delete groups.undefined;

    _.values(groups).forEach(callback);
  };
}

function eachRow(callback) {
  var iterator = createBoardIterator(function(cell, i) {
    return Math.floor(i / SIZE);
  });

  iterator(callback);
}

function eachColumn(callback) {
  var iterator = createBoardIterator(function(cell, i) {
    return i % SIZE;
  });

  iterator(callback);
}

function eachDiagonal(callback) {
  var iterator = createBoardIterator(function(cell, i) {
    var isFactorOfBoardSize = isDivisableBy(i, SIZE - 1) || isDivisableBy(i, SIZE + 1);

    // return undefined if cell index is not a factor of the board size
    // this will tell the iterator to not iterate over those values
    return isFactorOfBoardSize || undefined;
  });

  iterator(function(collection, i) {
    var groups = _.groupBy(collection, function(cell, i) {
      return isDivisableBy(i, 2);
    });

    var values = _.values(groups);

    if(!isDivisableBy(SIZE, 2)) {
      var pivotIndex = Math.floor(board.length / 2);
      values[1].push(board[pivotIndex]);
    }

    _.each(values, callback);
  });
}

function isDivisableBy(number, divosor) {
  return number % divosor === 0;
}

function hasWinner() {
  var winnerFound = false;
  // function collectionOwned(collection)
  function collectionUnique(collection) {
    var uniques = _.unique(collection);
    var isUnique = (uniques.length === 1 && uniques[0]);
    if(isUnique) winnerFound = true;
  }

  eachRow(collectionUnique);
  eachColumn(collectionUnique);
  eachDiagonal(collectionUnique);

  return winnerFound;
}

function print() {
  eachRow(log);
}

function log(msg) {
  console.log(msg);
}


// eachRow(function(row, i) {
//   console.log(row, i);
// });

// eachColumn(function(column, i) {
//   console.log(column, i);
// });

// eachDiagonal(function(diagonal, i) {
//   console.log(diagonal, i);
// });

print();

board[0] = 'x';
board[4] = 'x';
board[8] = 'x';

print();

console.log(hasWinner());
