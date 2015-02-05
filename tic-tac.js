var Game = require('./lib/models/game'),
    game = new Game();

game
  .use('random')
  .onRender(renderWithConsole)
  .start();

function renderWithConsole() {
  var values = this.board.map(getValue).join('\n');
  console.log(values + '\n');
}

function getValue(cell) {
  return cell.getValue() || '-';
}
