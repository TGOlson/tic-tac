var Cell = require('../lib/cell');

describe('Cell', function() {
  var cell;

  beforeEach(function() {
    cell = new Cell(1, 2);
  });

  describe('initialization', function() {

    // it('should set an x position', function() {
    //   expect(cell.position.x).toBe(1);
    // });

    // it('should set a y position', function() {
    //   expect(cell.position.y).toBe(2);
    // });

    it('should set a value of null', function() {
      expect(cell.value).toBe(null);
    });

    // describe('argument checking', function() {
    //   it('should throw an error if an x value is not defined', function() {
    //     var newCell = function() {
    //       new Cell();
    //     };

    //     expect(newCell).toThrow();
    //   });

    //   it('should throw an error if ay value is not defined', function() {
    //     var newCell = function() {
    //       new Cell(1);
    //     };

    //     expect(newCell).toThrow();
    //   });

    //   it('should not throw an error if a position value is zero', function() {
    //     var newCell = function() {
    //       new Cell(0, 0);
    //     };

    //     expect(newCell).not.toThrow();
    //   });
    // });
  });

  describe('setValue', function() {
    it('should set the value property on the cell', function() {
      var value = 'x';
      cell.setValue(value);
      expect(cell.value).toBe(value);
    });
  });
});
