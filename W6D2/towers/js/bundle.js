/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const HanoiGame = __webpack_require__(1);
const HanoiView = __webpack_require__(2);

console.log("working");

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Game {
  constructor() {
    this.towers = [[3, 2, 1], [], []];
  }

  isValidMove(startTowerIdx, endTowerIdx) {
      const startTower = this.towers[startTowerIdx];
      const endTower = this.towers[endTowerIdx];

      if (startTower.length === 0) {
        return false;
      } else if (endTower.length == 0) {
        return true;
      } else {
        const topStartDisc = startTower[startTower.length - 1];
        const topEndDisc = endTower[endTower.length - 1];
        return topStartDisc < topEndDisc;
      }
  }

  isWon() {
      // move all the discs to the last or second tower
      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  }

  move(startTowerIdx, endTowerIdx) {
      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
        return true;
      } else {
        return false;
      }
  }

  print() {
      console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
      this.print();
      reader.question("Enter a starting tower: ", start => {
        const startTowerIdx = parseInt(start);
        reader.question("Enter an ending tower: ", end => {
          const endTowerIdx = parseInt(end);
          callback(startTowerIdx, endTowerIdx);
        });
      });
  }

  run(reader, gameCompletionCallback) {
      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
        if (!this.move(startTowerIdx, endTowerIdx)) {
          console.log("Invalid move!");
        }

        if (!this.isWon()) {
          // Continue to play!
          this.run(reader, gameCompletionCallback);
        } else {
          this.print();
          console.log("You win!");
          gameCompletionCallback();
        }
      });
  }
}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);