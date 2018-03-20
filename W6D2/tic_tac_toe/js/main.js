const View = require("./ttt-view.js");
const Game = require("../lib/game.js");

const game = new Game();

$( () => {
  var $el = $(".ttt");
  new View(game, $el);
});
