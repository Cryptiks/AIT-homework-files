// game.js

// add event listener
var playNow = document.getElementById('startButton');
playNow.addEventListener('click', clickPlay);

function clickPlay(event) {
  // get the number of symbols the player desires
  var symbolsInput = document.getElementById('numSymbols');
  var numSymbols;
  if (symbolsInput.value > 8) {
    numSymbols = 8;
  }
  else if (symbolsInput.value === '' || symbolsInput.value < 1) {
      numSymbols = 1;
  }
  else {
    numSymbols = symbolsInput.value;
  }
  // remove the form(make it hidden)
  document.getElementById('startForm').style.visibility = "hidden";

  // generate a game board
  var rows, columns;
  var numCards = numSymbols * 2;
  if (numSymbols <= 2) {
    rows = 2;
    columns = 2;
  }
  else if (numSymbols >= 3 && numSymbols <= 4) {
    rows = 3;
    columns = 3;
  }
  else {
    rows = 4;
    columns = 4;
  }
  generateBoard(rows, columns, numSymbols, numCards);
  assignRandom(rows, columns, numSymbols, numCards);
  function generateBoard(rows, columns, numSymbols, numCards) {

    var cardCounter = 0;
    var body = document.body;

    // generate # guess
    var h2 = document.createElement('h2');
    h2.value = 0;
    h2.appendChild(document.createTextNode('#?\'s: ' + h2.value));
    body.appendChild(h2);

    var table = document.createElement('table');
    for (i = 0; i < rows; i++) {
      var row = document.createElement('tr');
      for (j = 0; j < columns; j++) {
        if (cardCounter === numCards) {
          break;
        }
        var cell = document.createElement('td');
        cell.setAttribute('class', 'cell');
        cardCounter++;
        cell.width = '100px';
        cell.height = '100px';
        // cell.innerHTML = "cell is row "+i+", column "+j;
        // cell.appendChild(document.createTextNode("cell is row "+i+", column "+j));

        // add event listener to each card
        cell.addEventListener('click', flipCard);
        row.appendChild(cell);

      }
      table.appendChild(row);
    }
    body.appendChild(table);
  }

  function assignRandom(rows, columns, numSymbols, numCards) {
    var symbols = [
      {symbol:'❤', count: 2},
      {symbol:'★', count: 2},
      {symbol:'☯', count: 2},
      {symbol:'❄', count: 2},
      {symbol:'♫', count: 2},
      {symbol:'☂', count: 2},
      {symbol:'☭', count: 2},
      {symbol:'♞', count: 2},
    ];
    symbols.splice(numSymbols);

    var table = document.getElementsByTagName('table');
    count = symbols.length * 2;

    // var cell = table.rows[rowCounter].cells[columnCounter];
    // console.log(cell.value);

    for (i = 0; i < count; i++) {
      var index = Math.floor((Math.random() * symbols.length));


      var td = document.getElementsByTagName('td')[i];
      td.value = symbols[index].symbol;
      // td.innerHTML = td.value;

      symbols[index].count--;
      if (symbols[index].count === 0) {
        // console.log("removing symbol: " + symbols[index].symbol);
        symbols.splice(index, 1);
        // console.log("symbols left: " + symbols);
      }
    }
  }

  var numFlips = 0;
  var totalFlips = 0;
  var flippedCards = [];
  var numGuesses = 0;
  var timeoutID;
  function flipCard(event) {
    if (timeoutID && numFlips == 2) {
      window.clearTimeout(timeoutID);
      handleTwoFlipped();
      timeoutID = null;
    }
    // allow only 2 flips at once
    if (numFlips != 2 && this !== flippedCards[0]) {
      this.style.backgroundColor = 'LightBlue';
      this.innerHTML = this.value;
      flippedCards[numFlips] = this;
      numFlips++;

      if (numFlips == 2) {
        numGuesses++;
        var h2 = document.getElementsByTagName('h2')[0];
        h2.removeChild(h2.firstChild);
        h2.appendChild(document.createTextNode('#?\'s: ' + numGuesses));
        timeoutID = window.setTimeout(handleTwoFlipped, 1000);
      }

    }
    function handleTwoFlipped() {



      // if the 2 flipped cards are not the same
      if (flippedCards[0].innerHTML !== flippedCards[1].innerHTML) {
        unFlipCard(flippedCards[0]);
        unFlipCard(flippedCards[1]);

      }
      // if 2 flipped cards are the same
      else {
        // leave them flipped and just reset the flipped cards array
        totalFlips += 2;
        determineWin();
      }
      // reset array and num of flips
      numFlips = 0;
      flippedCards = [];
    }
  }
  function unFlipCard(card) {
    card.style.backgroundColor = 'black';
    card.innerHTML = '';
  }

  function determineWin() {
    if (totalFlips === numCards) {
      // end game
      // clear board
      var body = document.body;
      var table = document.getElementsByTagName('table')[0];
      // console.log(table.parentNode);
      table.parentNode.removeChild(table);
      // console.log(body);
      // body.removeChild(table);

      // show thank you message
      var h1 = document.createElement('h1');
      h1.setAttribute('id', 'win');
      h1.appendChild(document.createTextNode('You\'re Done! Thanks 4 Playing.'));
      body.appendChild(h1);

    }

  }
}
