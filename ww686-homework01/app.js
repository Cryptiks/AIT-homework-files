var readlineSync = require('readline-sync');

// part 2 - blackjack functions
function generateCards() {
  var cards = [];
  var suits = ["♠", "♥", "♦", "♣"];
  var faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < faces.length; j++) {
      var card = {suit: suits[i], face: faces[j]};
      cards.push(card);
    }
  }

  return cards;
}

function shuffle(array) {
  newDeck = [];
  numCards = array.length;

  for (var i = 0; i < numCards; i++) {
    randomIndex = Math.floor(Math.random() * array.length);
    newDeck.push(array.splice(randomIndex, 1)[0]);
  }

  return newDeck;
}

function calculateHand(array) {
  total = 0;

  for (var i = 0; i < array.length; i++) {
    var value = array[i].face;
    switch(value) {
      case "J":
      case "Q":
      case "K":
        total += 10;
        break;
      case "A":
        if (total < 11) {
          total += 11;
        }
        else {
          total +=1;
        }
        break;
      default:
        total += Number(value);
        break;
    }
  }

  return total;
}

function printHand(array) {
  var hand = "";
  for (var i = 0; i < array.length; i++) {
    hand += array[i].face + "" + array[i].suit + " ";
  }

  return hand;
}

function determineWinner(playerTotal, computerTotal) {
  var outcome = null;

  if ((playerTotal === computerTotal) || (playerTotal > 21 && computerTotal > 21)) {
      outcome = "Tie!";
  }
  else if (computerTotal > 21) {
    outcome = "Player Wins";
  }
  else if (playerTotal > 21) {
    outcome = "Computer Wins";
  }
  else if (playerTotal > computerTotal) {
    outcome = "Player Wins";
  }
  else if (playerTotal < computerTotal ) {
    outcome = "Computer Wins";
  }

  return outcome;
}

// part 3 - interactive blackjack game
function startGame() {
  var playerHand = [];
  var computerHand = [];

  // generate cards
  var cards = generateCards();
  // shuffle cards
  var cards = shuffle(cards);

  // deal hands
  while (cards.length >= 26) {
    playerHand.push(cards.pop());
    playerHand.push(cards.pop());
    computerHand.push(cards.pop());
    computerHand.push(cards.pop());


    // player's turn
    //console.log(playerHand);
    console.log("");
    console.log("Your hand is: " + printHand(playerHand) + "... for a total of " + calculateHand(playerHand));
    while (calculateHand(playerHand) < 22) {
      var letter = readlineSync.question('type h to (h)it or s to (s)tay: ');
      if (letter === "s") {
        break;
      }
      playerHand.push(cards.pop());
      console.log("Your hand is: " + printHand(playerHand) + "... for a total of " + calculateHand(playerHand));
    }



    // computer's turn
    //console.log(computerHand);
    while (calculateHand(computerHand) < 17) {
      computerHand.push(cards.pop());
      //console.log("CPU hand is: " + printHand(computerHand) + "... for a total of " + calculateHand(computerHand));
    }

    console.log("Your hand: " + printHand(playerHand) + "(" + calculateHand(playerHand) +
                "), Computer hand: "+ printHand(computerHand) + "(" + calculateHand(computerHand) + ")");

    var winner = determineWinner(calculateHand(playerHand), calculateHand(computerHand));
    console.log(winner);

    console.log("");
    console.log("There are " + cards.length + " cards left in the deck");
    console.log("-----------------------");

    // clear hands
    playerHand = [];
    computerHand = [];

  }
  console.log("");
  console.log("Less than 26 cards left. Game over!");
  console.log("");


}


// start blackjack game
startGame();
