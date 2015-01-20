var utils = require('../utils');

module.exports = function(board, done) {
  var move = getRandomMove(board);

  while(!move.isOpen) {
    move = getRandomMove(board);
  }


  // done(move);
  return move;
};

function getRandomMove(board) {
  var rowNum = utils.randomInteger(board.size - 1),
      colNum = utils.randomInteger(board.size - 1),
      cell = board.getCell(rowNum, colNum);

  return {
    cell: cell,
    isOpen: !cell.isClaimed,
    row: rowNum,
    col: colNum
  };
}
