class View {
  constructor(game, rootEl) {
    this.game = game;
    this.rootEl = rootEl;
    this.setUpTowers();
    this.clickTower();
  }

  setUpTowers() {
    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
      const $tower = $("<ul>").addClass("tower").addClass("group").data("towerIdx", towerIdx);

      if (towerIdx === 0) {
        const $disc1 = $("<li>").addClass("disc1").data("towerIdx", towerIdx);
        const $disc2 = $("<li>").addClass("disc2").data("towerIdx", towerIdx);
        const $disc3 = $("<li>").addClass("disc3").data("towerIdx", towerIdx);
        $tower.append($disc3).append($disc2).append($disc1);
      }
      this.rootEl.append($tower);
    }
  }

  clickTower() {
    $("ul").on("click", event => {
      event.preventDefault();
      const $input = $(event.currentTarget);

      $input.addClass("clickedTower");
      this.makeMove($input);
    });
  }

  makeMove($tower) {
    const numClickedTowers = this.rootEl.find(".clickedTower").length;
    console.log(numClickedTowers);

    if (numClickedTowers === 1) {
      $tower.addClass("tower-from");
    } else {
      const $startTower = this.rootEl.find(".tower-from");
      const startTowerIdx = $startTower.data("towerIdx");
      const $disks = $startTower.children();
      const $disk = $disks.eq($disks.length - 1); // disk to move
      console.log($disk);
      const endTowerIdx = $tower.data("towerIdx");
      $startTower.removeClass("clickedTower");
      $startTower.removeClass("tower-from");
      $tower.removeClass("clickedTower");

      if(this.game.move(startTowerIdx, endTowerIdx)) {
        // remove disk from startTower, add it to endTower,
        // and reset its towerIdx
        $tower.append($disk);
        $disk.data("towerIdx", endTowerIdx);
        if (this.game.isWon()) {
          alert("Good work, you!");
        }
      } else {
        alert("Invalid move!");
      }
    }
  }

}

module.exports = View;
