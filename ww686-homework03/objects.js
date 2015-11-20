// objects.js

// player
function Player(name) {
  this.name = name;
  this.playerHistory = [];
  this.opponentsHistory = [];
}
Player.prototype.getNextMove = function() {
  // generates next move; always R for regular player
  return "R";
}
Player.prototype.move = function() {
  var nextMove = this.getNextMove();
  //saves it in historical moves
  this.playerHistory.push(nextMove);
  return nextMove;
}
Player.prototype.recordOpponentMove = function(opponentMove) {
  this.opponentsHistory.push(opponentMove);
}

// history repeats itself player
function HistoryRepeatsItselfPlayer(name) {
  Player.call(this, name);
}
HistoryRepeatsItselfPlayer.prototype = Object.create(Player.prototype);
HistoryRepeatsItselfPlayer.prototype.getNextMove = function() {
  if (this.opponentsHistory.length === 0) {
    var move;
    var x = Math.floor((Math.random() * 3));
    if (x === 0) {
      return "R";
    }
    else if (x === 1) {
      return "P";
    }
    else {
      return "S";
    }
  }
  else {
    var opponentLastMove = this.opponentsHistory[this.opponentsHistory.length - 1];
    if (opponentLastMove === "R") {
      return "P";
    }
    else if (opponentLastMove === "P") {
      return "S";
    }
    else {
      return "R"
    }
  }
}

// strategy player
function StrategyPlayer(name, strategyObject) {
  Player.call(this, name);
  this.strategy = strategyObject;
}
StrategyPlayer.prototype.recordOpponentMove = function(opponentMove) {
  this.opponentsHistory.push(opponentMove);
}
StrategyPlayer.prototype.move = function() {
  var nextMove = this.strategy.getNextMove(this.opponentsHistory);
  this.playerHistory.push(nextMove);
  return nextMove;
}

// look at previous move strategy
function LookAtPreviousMoveStrategy() {
}
LookAtPreviousMoveStrategy.prototype.getNextMove = function(arrayMoves) {
  if (arrayMoves.length === 0) {
    var move;
    var x = Math.floor((Math.random() * 3));
    if (x === 0) {
      return "R";
    }
    else if (x === 1) {
      return "P";
    }
    else {
      return "S";
    }
  }
  else {
    var opponentLastMove = arrayMoves[arrayMoves.length - 1];
    if (opponentLastMove === "R") {
      return "P";
    }
    else if (opponentLastMove === "P") {
      return "S";
    }
    else {
      return "R";
    }
  }
}

// logging output
var playerRegular = new Player("Normal Nancy");
console.log(playerRegular.name);
console.log("---------");
console.log("Nancy always plays rock: " + playerRegular.move());
playerRegular.recordOpponentMove("P");
console.log("Nancy always plays rock, regardless of her opponent's last move: " + playerRegular.move());
console.log("All of Nancy's moves so far: " + (playerRegular.playerHistory));
console.log("All of her opponent's moves so far: " + playerRegular.opponentsHistory);

console.log("\n...\n");

var playerHistory = new HistoryRepeatsItselfPlayer("Timely Tabitha");
console.log(playerHistory.name);
console.log("---------");
console.log("Tabitha's first move should be random: " + playerHistory.move());
playerHistory.recordOpponentMove("R");
console.log("If her last opponent's move was rock, she'll play paper: " + playerHistory.move());
playerHistory.recordOpponentMove("P");
console.log("If her last opponent's move was paper, she'll play scissors: " + playerHistory.move());
console.log("All of Tabitha's moves so far: " + (playerHistory.playerHistory));
console.log("All of her opponent's moves so far: " + playerHistory.opponentsHistory);

console.log("\n...\n");

playerStrategy = new StrategyPlayer("Previous Patty", new LookAtPreviousMoveStrategy());
console.log(playerStrategy.name);
console.log("---------");
console.log("Previous Patty's first move should be random: " + playerStrategy.move());
playerStrategy.recordOpponentMove("R");
console.log("If her last opponent's move was rock, she'll play paper: " + playerStrategy.move());
playerStrategy.recordOpponentMove("P");
console.log("If her last opponent's move was paper, she'll play scissors: " + playerStrategy.move());
console.log("All of Previous Patty's moves so far: " + (playerStrategy.playerHistory));
console.log("All of her opponent's moves so far: " + playerStrategy.opponentsHistory);
