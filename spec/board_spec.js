var Board = require('../lib/board');

describe('Board', function() {
  var board;

  function makeCell(value) {
    return {
      value: value,
      setValue: function(value) {
        this.value = value;
      }
    };
  }

  beforeEach(function() {
    spyOn(Board.prototype, 'createCell').andCallFake(makeCell.bind(null, null));
    board = new Board();
  });

  describe('initialization', function() {
    it('should default to a board size of 3 one is not defined', function() {
      expect(board.size).toBe(3);
    });

    it('should generate a new set of cells', function() {
      spyOn(Board.prototype, 'makeCells');

      var board = new Board();
      expect(board.makeCells).toHaveBeenCalled();
    });

    it('should set an arbitrary board size if one is defined', function() {
      var board = new Board(5);
      expect(board.size).toBe(5);
    });
  });

  describe('#makeCells', function() {
    it('should return an array with length relative to the board size', function() {
      expect(board.cells.length).toBe(board.size);
    });
  });

  describe('#makeRow', function() {
    it('should return an array with length relative to the board size', function() {
      var row = board.makeRow();
      expect(row.length).toBe(board.size);
    });
  });

  describe('#getRow', function() {
    it('should return a row based on the provided row number', function() {
      var row = board.getRow(1);
      expect(row).toBe(board.cells[1]);
    });

    it('should return undefined if no row exists in the specified location', function() {
      var row = board.getRow(7);
      expect(row).toBeUndefined();
    });
  });

  describe('#getCell', function() {
    it('should return a cell from the specified row and column', function() {
      var cell = board.getCell(1, 1);
      expect(cell).toBe(board.cells[1][1]);
    });

    it('should return undefined if no cell exists in the specified location', function() {
      var row = board.getCell(7, 7);
      expect(row).toBeUndefined();
    });

    // this test is implicitly covered by virtue of the previous test passing
    // but an error could be common here, so it is better to explicitly test the desired behavior
    it('should not throw an error if no cell exists in the specified location', function() {
      var getCell = board.getCell.bind(board, 7, 7);
      expect(getCell).not.toThrow();
    });
  });

  describe('#markCell', function() {
    it('should set a cell value', function() {
      var value = 'x';

      board.markCell(1, 1, value);
      expect(board.cells[1][1].value).toBe(value);
    });

    it('should throw an error if the cell does not exist', function() {
      var markCell = board.markCell.bind(board, 7, 7, 'x');
      expect(markCell).toThrow();
    });
  });
});
