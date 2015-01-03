var Cell = require('../lib/cell');

describe('Cell', function() {
  var cell;

  beforeEach(function() {
    cell = new Cell(1, 2);
  });

  describe('initialization', function() {
    it('should set a value of null', function() {
      expect(cell.value).toBe(null);
    });
  });

  describe('#getValue', function() {
    it('should get the value property on the cell', function() {
      var value = 'x';
      cell.value = value;
      expect(cell.getValue()).toBe(value);
    });
  });

  describe('#setValue', function() {
    it('should set the value property on the cell', function() {
      var value = 'x';
      cell.setValue(value);
      expect(cell.value).toBe(value);
    });
  });
});
