var player1 = new Object();
var player2 = new Object();
var player3 = new Object();
var player4 = new Object();
var player5 = new Object();
var player6 = new Object();
var player7 = new Object();
var player8 = new Object();
var playerArray = [player1, player2, player3, player4, player5];
var totalWins = 0;
var numOfGames = 0;
var numOfPlayers = 0;
var drawBasket = [];
var numOfWinsPossible = 0;
var scoreA = 0;
var scoreB = 0;


//Takes the 6 player inputs and generates them in an array. This populates the bracket and scoreboard.
//TODO: add an extra 'are you sure?' prompt when generating to avoid accidental overwriting. Or disable/remove the button.
function generate(playerNum){
  //assign names to player objects


  if (playerNum == 8){
    numOfPlayers = 8;
    numOfGames = 7;
    numOfWinsPossible = 28;
    playerArray.push(player7);
    playerArray.push(player8);
  } else if (playerNum == 5){
    numOfPlayers = 5;
    numOfGames = 4;
    numOfWinsPossible = 10;
  } else {
    numOfPlayers = 6;
    numOfGames = 6;
    numOfWinsPossible = 18;
    playerArray.push(player6);
  }

  for (i = 0; i<numOfPlayers; i++){
    playerArray[i].name = document.getElementById("p"+(i+1)).value;
    playerArray[i].wins = 0;
    playerArray[i].losses = 0;
  }

  //randomize the players
  randomize(playerArray);

  //Initialize scoreboard
  for (i = 0; i<playerArray.length; i++){
    //Populate names
    document.getElementById("tp"+(i+1)).innerHTML = playerArray[i].name;

    //Populate scores & remaining games
    var tpscore = "tp"+(i+1)+"score";
    var tpgames = "tp"+(i+1)+"games";
    document.getElementById(tpscore).innerHTML = playerArray[i].wins+"-"+playerArray[i].losses;
    document.getElementById(tpgames).innerHTML = numOfGames - (playerArray[i].wins+playerArray[i].losses);
    document.getElementById("entry").style.display = "none";
  }

  //Populate bracket after the players are randomized.
  if (numOfPlayers == 8){
    for (j = 0; j<numOfGames; j++){
    document.getElementsByClassName("sd1")[j].innerHTML = playerArray[0].name;
    document.getElementsByClassName("sd2")[j].innerHTML = playerArray[1].name;
    document.getElementsByClassName("sd3")[j].innerHTML = playerArray[2].name;
    document.getElementsByClassName("sd4")[j].innerHTML = playerArray[3].name;
    document.getElementsByClassName("sd5")[j].innerHTML = playerArray[4].name;
    document.getElementsByClassName("sd6")[j].innerHTML = playerArray[5].name;
    document.getElementsByClassName("sd7")[j].innerHTML = playerArray[6].name;
    document.getElementsByClassName("sd8")[j].innerHTML = playerArray[7].name;
    }
  } else if (numOfPlayers == 5){
    for (j = 0; j<numOfGames; j++){
    document.getElementsByClassName("sd1")[j].innerHTML = playerArray[0].name;
    document.getElementsByClassName("sd2")[j].innerHTML = playerArray[1].name;
    document.getElementsByClassName("sd3")[j].innerHTML = playerArray[2].name;
    document.getElementsByClassName("sd4")[j].innerHTML = playerArray[3].name;
    document.getElementsByClassName("sd5")[j].innerHTML = playerArray[4].name;
    }
  } else {
    for (j = 0; j<numOfGames; j++){
    document.getElementsByClassName("sd1")[j].innerHTML = playerArray[0].name;
    document.getElementsByClassName("sd2")[j].innerHTML = playerArray[1].name;
    document.getElementsByClassName("sd3")[j].innerHTML = playerArray[2].name;
    document.getElementsByClassName("sd4")[j].innerHTML = playerArray[3].name;
    document.getElementsByClassName("sd5")[j].innerHTML = playerArray[4].name;
    document.getElementsByClassName("sd6")[j].innerHTML = playerArray[5].name;
    }
  }

}

// Called everytime a checkbox is clicked. Passes playerID for the 2 winners, the checkbox ID, and playerID for 2 losers.
  function refreshTable(w1, w2, boxID, l1, l2){

      //This is used to get the counterpart checkbox reference. (teamA & teamB's checkboxes)
      var lastChar = boxID[boxID.length - 1];
      var gameName = boxID.slice(0, boxID.length - 1);

      //If last character is 'a' then teamA won, and teamB lost. Else vice versa.
      if (lastChar == 'a'){
        var checkboxWinner = document.getElementById(gameName+'a');
        var checkboxLoser = document.getElementById(gameName+'b');
      } else {
        var checkboxLoser = document.getElementById(gameName+'a');
        var checkboxWinner = document.getElementById(gameName+'b');
      }

      //Disable the loser's checkbox and update the scores.
      if (checkboxWinner.checked){
        playerArray[w1].wins++;
        playerArray[w2].wins++;
        playerArray[l1].losses++;
        playerArray[l2].losses++;
        checkboxLoser.disabled = true;
        totalWins = totalWins+2;
      //In case the user makes a mistake, they can uncheck the checkbox to change their option. Revert the scores
      }else{
        playerArray[w1].wins--;
        playerArray[w2].wins--;
        playerArray[l1].losses--;
        playerArray[l2].losses--;
        checkboxLoser.disabled = false;
        totalWins = totalWins-2;
      }

      //Update the four player's points in scoreboard
      document.getElementById("tp"+(w1+1)+"score").innerHTML = playerArray[w1].wins+"-"+playerArray[w1].losses;
      document.getElementById("tp"+(w2+1)+"score").innerHTML = playerArray[w2].wins+"-"+playerArray[w2].losses;
      document.getElementById("tp"+(l1+1)+"score").innerHTML = playerArray[l1].wins+"-"+playerArray[l1].losses;
      document.getElementById("tp"+(l2+1)+"score").innerHTML = playerArray[l2].wins+"-"+playerArray[l2].losses;

      //Update the four player's remaining games in scoreboard
      document.getElementById("tp"+(w1+1)+"games").innerHTML = numOfGames - (playerArray[w1].wins+playerArray[w1].losses);
      document.getElementById("tp"+(w2+1)+"games").innerHTML = numOfGames - (playerArray[w2].wins+playerArray[w2].losses);
      document.getElementById("tp"+(l1+1)+"games").innerHTML = numOfGames - (playerArray[l1].wins+playerArray[l1].losses);
      document.getElementById("tp"+(l2+1)+"games").innerHTML = numOfGames - (playerArray[l2].wins+playerArray[l2].losses);

      document.getElementById("tp"+(w1+1)+"rng").innerHTML = (playerArray[w1].wins / totalWins * 100) + "%";
      document.getElementById("tp"+(w2+1)+"rng").innerHTML = (playerArray[w2].wins / totalWins * 100)+ "%";
      document.getElementById("tp"+(l1+1)+"rng").innerHTML = (playerArray[l1].wins / totalWins * 100)+ "%";
      document.getElementById("tp"+(l2+1)+"rng").innerHTML = (playerArray[l2].wins / totalWins * 100)+ "%";
  }


function displayModal(id){
    document.getElementById(id).style.display = "block";
}

function closeModal(id){
  document.getElementById(id).style.display = "none";
  if (id == 'scorekeep'){
  scoreA = 0;
  scoreB = 0;
  document.getElementById('scoreA').innerHTML = scoreA;
  document.getElementById('scoreB').innerHTML = scoreB;
  }
}

function increment(id){
  if (id == 'scoreA'){
    scoreA++;
    document.getElementById(id).innerHTML = scoreA;
  } else {
    scoreB++;
    document.getElementById(id).innerHTML = scoreB;
  }
}

function decrement(id){
  if (id == 'scoreA'){
    if (scoreA>0){
    scoreA--;
    document.getElementById(id).innerHTML = scoreA;
    }
  } else {
    if (scoreB>0){
    scoreB--;
    document.getElementById(id).innerHTML = scoreB;
    }
  }
}


function selectRaffle(){
  var timer = 3;
  document.getElementsByClassName('pyro')[0].style.visibility = "hidden";
  for(let i = 0; i < playerArray.length; i++){
		for(let j = 0; j < playerArray[i].wins; j++){
				drawBasket.push(playerArray[i].name);
		}
	}

	for(let k = 0; k < 3; k++){
		drawBasket = randomize(drawBasket);
	}

  document.getElementById('raffleBtn').disabled = true;
  var counting = setInterval(function(){
    if(timer == 0){
      document.getElementById('winner').innerHTML = chooseRandom();
      drawBasket = [];
      document.getElementById('raffleBtn').disabled = false;
      document.getElementsByClassName('pyro')[0].style.visibility = 'visible';

      clearInterval(counting);
    } else {
      document.getElementById('winner').innerHTML = timer;
      timer--;
    }
  }, 1000);

}

function chooseRandom(){
  //28 winners for 8players
  //18 winners for 6players
  //10 winners for 5players
  return drawBasket[Math.floor(Math.random() * numOfWinsPossible)];
}

//Shuffles the playerArray so that order of names entered is arbitrary.
function randomize(playerArray){
  var m = playerArray.length;
  var t, i;

  while(m) {
    i = Math.floor(Math.random() * m--);

    temp = playerArray[m].name;
    playerArray[m].name = playerArray[i].name;
    playerArray[i].name = temp;
  }
  return playerArray;
}
