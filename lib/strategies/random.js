var utils = require('../utils/utils');

module.exports = function(game) {
  var board = game.board,
      move = getRandomMove(board);

  while(!move.isOpen) {
    move = getRandomMove(board);
  }

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
