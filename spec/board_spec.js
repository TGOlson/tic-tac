var Board = require('../lib/board');

var noop = function() {};

describe('Board', function() {
  var board,
      cell;

  beforeEach(function() {
    cell = {value: null};

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

  describe('generateCells', function() {
    it('should set an array of cell rows relative to the board size', function() {
      expect(board.cells.length).toBe(3);
    });

    it('should set each cell row relative to the board size', function() {
      expect(board.cells[0].length).toBe(3);
    });
  });

  describe('iterate', function() {
    var obj = {
      iterator: noop
    };

    beforeEach(function() {
      spyOn(obj, 'iterator');
    });

    it('should invoke a function against each cell', function() {
      board.iterate(obj.iterator);
      expect(obj.iterator.callCount).toBe(9);
    });

    it('should pass the cell and position coordinates to the iterator', function() {
      board.iterate(obj.iterator);

      // will match any of the calls
      expect(obj.iterator).toHaveBeenCalledWith(cell, 0, 0);
    });
  });

  describe('map', function() {
    var collection;

    function transformer(cell) {
      return cell.value;
    }

    beforeEach(function() {
      collection = board.map(transformer);
    });

    it('should return a new collection of the same size', function() {
      expect(collection.length).toBe(3);
    });

    it('should map each cell based on the provided transformer function', function() {
      var result = collection[0][0];
      expect(result).toBe(null);
    });

    it('should not mutate the original collection of cells', function() {
      var originalCell = board.cells[0][0];
      expect(originalCell).toBe(cell);
    });
  });

  describe('getValues', function() {
    it('should return an array of cell values', function() {
      var values = board.getValues();
      expect(values[0][0]).toBe(cell.value);
    });
  });

  describe('hasWinner', function() {
    var board,
        values;

    beforeEach(function() {

      // use small board for more concise setup
      board = new Board(2);

      values = [
        [null, null],
        [null, null]
      ];

      spyOn(board, 'getValues').andCallFake(function() {
        return values;
      });
    });

    it('should return false if no value is the winner', function() {
      expect(board.hasWinner()).toBe(false);
    });

    it('should return true if a value has claimed an entire row', function() {
      values[0] = ['x', 'x'];
      expect(board.hasWinner()).toBe(true);
    });

    it('should return true if a value has claimed an entire column', function() {
      values[0][0] = 'x';
      values[1][0] = 'x';

      expect(board.hasWinner()).toBe(true);
    });
  });
});
