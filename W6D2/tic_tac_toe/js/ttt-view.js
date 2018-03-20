class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $("li").on("click", event => {
      event.preventDefault();
      const $input = $(event.currentTarget);
      this.makeMove($input);
    });
  }

  makeMove($square) {
    const pos = $square.data("data-pos");
    this.game.playMove(pos);

    const mark = this.game.currentPlayer;
    console.log(`${mark}`);
    $square.addClass(`${mark}`);
    $square.text(`${mark}`);
    if(this.game.isOver()) {
      const loser = this.game.board.winner();
      const winner = loser === 'x' ? 'o' : 'x';
      $(`.${winner}`).addClass("winner");
      $(`.${loser}`).addClass("loser");
      $('body').append(`<strong> You win, ${winner}!</strong>`);
    }
  }

  setupBoard() {
    for (let i = 0; i < 3; i++) {
      const rowIdx = this.$el.find(".row").length;
      const $row = $("<ul>").addClass("row").addClass("group");

      for(let colIdx = 0; colIdx < 3; colIdx++) {
        const $square = $("<li>").addClass("square").data("data-pos", [rowIdx, colIdx]);
        $row.append($square);
      }
      this.$el.append($row);
    }
  }
}

module.exports = View;
