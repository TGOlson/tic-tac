function Cell() {
  this.value = null;
}

Cell.prototype.setValue = function(value) {
  this.value = value;
};

module.exports = Cell;
