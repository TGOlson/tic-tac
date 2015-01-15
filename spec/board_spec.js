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
    spyOn(Board.prototype, '_createCell').andCallFake(makeCell.bind(null, null));
    board = new Board();
  });

  describe('initialization', function() {
    it('should default to a board size of 3 one is not defined', function() {
      expect(board.size).toBe(3);
    });

    it('should generate a new set of cells', function() {
      spyOn(Board.prototype, '_makeCells');

      var board = new Board();
      expect(board._makeCells).toHaveBeenCalled();
    });

    it('should set an arbitrary board size if one is defined', function() {
      var board = new Board(5);
      expect(board.size).toBe(5);
    });
  });

  describe('#_makeCells', function() {
    it('should return an array with length relative to the board size', function() {
      expect(board.cells.length).toBe(board.size);
    });
  });

  describe('#_makeRow', function() {
    it('should return an array with length relative to the board size', function() {
      var row = board._makeRow();
      expect(row.length).toBe(board.size);
    });
  });

  describe('#getRow', function() {
    it('should return a row based on the provided row number', function() {
      var row = board.getRow(1);
      expect(row).toEqual(board.cells[1]);
    });

    it('should return a copy of the row', function() {
      var row = board.getRow(1);
      expect(row).not.toBe(board.cells[1]);
    });

    it('should return null if no row exists in the specified location', function() {
      var row = board.getRow(7);
      expect(row).toBeUndefined();
    });
  });

  describe('#getColumn', function() {
    it('should return a column based on the provided column number', function() {
      var column = board.getColumn(1),
          expectedColumn = [
            board.cells[0][1],
            board.cells[1][1],
            board.cells[2][1]
          ];

      expect(column).toEqual(expectedColumn);
    });

    it('should return undefined if no column exists in the specified location', function() {
      var column = board.getColumn(7),

          // TODO: this test should check that the return value is 'undefined'
          // not that it is an array of undefined
          expectedColumn = [
            undefined,
            undefined,
            undefined
          ];

      expect(column).toEqual(expectedColumn);
    });
  });

  describe('#getDiagonal', function() {
    it('should return a diagonal based on the provided direction', function() {
      var diagonal = board.getDiagonal(1),
          expectedDiagonal = [
            board.cells[0][0],
            board.cells[1][1],
            board.cells[2][2]
          ];

      expect(diagonal).toEqual(expectedDiagonal);
    });

    it('should return undefined if no diagonal exists in the specified direction', function() {
      var diagonal = board.getDiagonal(7),

          // TODO: this test should check that the return value is 'undefined'
          // not that it is an array of undefined
          expectedDiagonal = [
            undefined,
            undefined,
            undefined
          ];

      expect(diagonal).toEqual(expectedDiagonal);
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
