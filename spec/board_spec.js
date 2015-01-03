var Board = require('../lib/board');

var noop = function() {};

describe('Board', function() {
  var board,
      cell;

  function makeCell(value) {
    return {
      value: value,
      getValue: function() {
        return this.value;
      }
    };
  }

  beforeEach(function() {
    cell = makeCell(null);
    spyOn(Board.prototype, 'createCell').andReturn(cell);
    board = new Board();
  });

  describe('initialization', function() {

    it('should default to a board size of 3 one is not defined', function() {
      expect(board.size).toBe(3);
    });

    it('should generate a new set of cells', function() {
      spyOn(Board.prototype, 'generateCells');
      var board = new Board();
      expect(board.generateCells).toHaveBeenCalled();
    });

    it('should an arbitrary board size if one is defined', function() {
      var board = new Board(5);
      expect(board.size).toBe(5);
    });
  });

  describe('#generateCells', function() {
    it('should set an array of cell rows relative to the board size', function() {
      expect(board.cells.length).toBe(3);
    });

    it('should set each cell row relative to the board size', function() {
      expect(board.cells[0].length).toBe(3);
    });
  });

  describe('#iterate', function() {
    var obj = {
      iterator: noop
    };

    beforeEach(function() {
      spyOn(obj, 'iterator');
      board.iterate(obj.iterator);
    });

    it('should invoke a function against each cell', function() {
      expect(obj.iterator.callCount).toBe(9);
    });

    it('should pass the cell and position coordinates to the iterator', function() {
      // will match any call
      expect(obj.iterator).toHaveBeenCalledWith(cell, 0, 0);
    });
  });

  describe('#map', function() {
    var collection;

    function callback(cell) {
      return cell.value;
    }

    beforeEach(function() {
      collection = board.map(callback);
    });

    it('should return a new collection of the same size', function() {
      expect(collection.length).toBe(3);
    });

    it('should map each cell based on the provided callback function', function() {
      var result = collection[0][0];
      expect(result).toBe(null);
    });

    it('should not mutate the original collection of cells', function() {
      var originalCell = board.cells[0][0];
      expect(originalCell).toBe(cell);
    });
  });

  describe('#eachRow', function() {
    var obj = {
      callback: noop
    };

    beforeEach(function() {
      spyOn(obj, 'callback');
      board.eachRow(obj.callback);
    });

    it('should iterate through all the rows on the board', function() {
      expect(obj.callback.callCount).toBe(3);
    });

    it('should pass the row and index to the callback', function() {
      // will match any call
      expect(obj.callback).toHaveBeenCalledWith(jasmine.any(Array), 0);
    });
  });

  describe('#eachColumn', function() {
    var obj = {
      callback: noop
    };

    beforeEach(function() {
      spyOn(obj, 'callback');
      board.eachColumn(obj.callback);
    });

    it('should iterate through all the columns on the board', function() {
      expect(obj.callback.callCount).toBe(3);
    });

    it('should pass the column and index to the callback', function() {
      // will match any call
      expect(obj.callback).toHaveBeenCalledWith(jasmine.any(Array), 0);
    });
  });

  describe('#eachDiagonal', function() {
    var obj = {
      callback: noop
    };

    beforeEach(function() {
      spyOn(obj, 'callback');
      board.eachDiagonal(obj.callback);
    });

    it('should iterate through all the diagonals on the board', function() {
      expect(obj.callback.callCount).toBe(2);
    });

    it('should pass the column and index to the callback', function() {
      // will match any call
      expect(obj.callback).toHaveBeenCalledWith(jasmine.any(Array), 0);
    });
  });

  describe('#getValues', function() {
    it('should return an array of cell values', function() {
      var values = board.getValues();
      expect(values[0][0]).toBe(cell.value);
    });
  });

  describe('#collectionClaimed', function() {
    function makeCollection(val1, val2) {
      return [makeCell(val1), makeCell(val2)];
    }

    it('should return false if a collection of cells do not all have the same value', function() {
      var collection = makeCollection('x', 'y'),
          isClaimed = board.collectionClaimed(collection);

      expect(isClaimed).toBe(false);
    });

    it('should return false if a collection of cells have falsey values', function() {
      var collection = makeCollection(null, null),
          isClaimed = board.collectionClaimed(collection);

      expect(isClaimed).toBe(false);
    });

    it('should return true if a collection of cells have the same values', function() {
      var collection = makeCollection('x', 'x'),
          isClaimed = board.collectionClaimed(collection);

      expect(isClaimed).toBe(true);
    });
  });

  describe('#hasWinner', function() {
    var board;

    function makeCollection(val1, val2) {
      return [makeCell(val1), makeCell(val2)];
    }

    beforeEach(function() {

      // use small board for more concise setup
      board = new Board(2);
    });

    it('should return false if no value is the winner', function() {
      expect(board.hasWinner()).toBe(false);
    });

    it('should return true if a value has claimed an entire row', function() {
      board.cells[0] = makeCollection('x', 'x');
      expect(board.hasWinner()).toBe(true);
    });

    it('should return true if a value has claimed an entire column', function() {
      board.cells[0] = makeCollection('x', null);
      board.cells[1] = makeCollection('x', null);

      expect(board.hasWinner()).toBe(true);
    });


    it('should return true if a value has claimed an entire diagonal', function() {
      board.cells[0] = makeCollection(null, 'x');
      board.cells[1] = makeCollection('x', null);

      expect(board.hasWinner()).toBe(true);
    });
  });
});
