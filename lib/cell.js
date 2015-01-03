function Cell() {
  this.value = null;
}

Cell.prototype.getValue = function() {
  return this.value;
};

Cell.prototype.setValue = function(value) {
  this.value = value;
};

module.exports = Cell;
