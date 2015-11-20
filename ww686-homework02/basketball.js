// basketball.js

var request = require('request');

var team1 = [], team2 = [], allPlayers = [];
var team1name = null, team2name = null;

var heatsVSspurs = "http://foureyes.github.io/csci-ua.0480-fall2015-001/homework/02/2014-06-15-heat-spurs.json";
var clippersVSthunders = "http://foureyes.github.io/csci-ua.0480-fall2015-001/homework/02/2014-04-09-thunder-clippers.json";

obtainStats(heatsVSspurs);
obtainStats(clippersVSthunders);

// use obtainStats to call request twice on two different URLs
function obtainStats (url) {
  request(url, function (error, response, body) {
    team1 = [], team2 = [];
    allPlayers = JSON.parse(body.slice(0, body.length));
    team1name = (allPlayers[0].team);

    var index = 0;
    while (allPlayers[index].team === team1name) {
      index++;
    }
    team2name = allPlayers[index].team;

    // calls all the functions
    basketball();
  });
}

// separates all the players into two teams
function separateTeams() {
  allPlayers.forEach(function(player) {
    if (player.team === team1name) {
      team1 = team1.concat(player);
    }
    else {
      team2 = team2.concat(player);
    }
  });
}

// calculates total points for a certain player
function calculateTotal(player) {
  return (player.threesMade * 3) + ((player.fieldGoalsMade - player.threesMade) * 2) + (player.freeThrowsMade);
}

// Final score
function finalScore() {
  var team1Score = 0, team2Score = 0;

  team1.forEach(function(player) {
    team1Score += calculateTotal(player)
  });
  team2.forEach(function(player) {
    team2Score += calculateTotal(player);
  });

  console.log("Final Score: " + team1name + " " + team1Score + ", " +team2name + " " + team2Score);
  console.log("=====");
}

// Player with highest percentage of points from three pointers
function highestPercentThrees() {
  var highestPlayer = "";
  var highest = 0;
  var scoredAtLeastTenPoints = [];
  var total = 0;

  allPlayers.forEach(function(player) {
    if (calculateTotal(player) > 9) {
      scoredAtLeastTenPoints = scoredAtLeastTenPoints.concat(player);
    }
  });

  scoredAtLeastTenPoints.forEach(function(player) {
    if (highest < player.threesMade/calculateTotal(player)) {
      highest = player.threesMade/calculateTotal(player);
      highestPlayer = player.name;
    }
  });

  console.log("* Player with highest percentage of points from three pointers: " + highestPlayer);
}

// Team with most rebounds
function mostRebounds() {
  var team1Rebounds = 0, team2Rebounds = 0, teamMostRebounds;
  var teamName = null;

  team1Rebounds = team1.reduce(function(accum, player) {
    return (accum + (player.offensiveRebounds + player.defensiveRebounds));
  }, 0);
  team2Rebounds = team2.reduce(function(accum, player) {
    return (accum + (player.offensiveRebounds + player.defensiveRebounds));
  }, 0);

  if (team1Rebounds > team2Rebounds) {
    teamMostRebounds = team1Rebounds;
    teamName = team1name;
  }
  else {
    teamMostRebounds = team2Rebounds;
    teamName = team2name;
  }

  console.log("* Team with most rebounds: " + teamName + " with " + teamMostRebounds);
}

// Non guard player with most assists
function nonGuardMostAssists() {
  var nonGuards = [];
  var playerWithMostAssists = null;
  var mostAssists = 0;

  nonGuards = allPlayers.filter(function(player) {
    if (player.position !== "G") {
      return player;
    }
  });

  nonGuards.forEach(function(player) {
    if (mostAssists < player.assists) {
      mostAssists = player.assists;
      playerWithMostAssists = player;
    }
  });
  console.log("* Non guard player with most assists: "+ playerWithMostAssists.name + " with " + playerWithMostAssists.assists);
}

// Player with more turnovers than assists
function moreTurnoversThanAssists() {
  console.log("* Players with more turnovers than assists:");
  allPlayers.forEach(function(player) {
    if (player.turnovers > player.assists) {
      console.log(player.name);
    }
  });
}

// BASKETBALL! calls all the functions
function basketball() {
  console.log();
  separateTeams();
  finalScore();
  highestPercentThrees();
  mostRebounds();
  nonGuardMostAssists();
  moreTurnoversThanAssists();
  console.log();
}
