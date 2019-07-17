var player1 = new Object();
var player2 = new Object();
var player3 = new Object();
var player4 = new Object();
var player5 = new Object();
var player6 = new Object();
var playerArray = [player1, player2, player3, player4, player5, player6];

function generate(){
  //assign names to player objects
  for (i = 0; i<playerArray.length; i++){
    playerArray[i].name = document.getElementById("p"+(i+1)).value;
    playerArray[i].wins = 0;
    playerArray[i].losses = 0;
  }

  //randomize the players
  randomize(playerArray);

  //Populate player names in the scoreboard & bracket.
  for (i = 0; i<playerArray.length; i++){
    document.getElementById("tp"+(i+1)).innerHTML = playerArray[i].name;
  }
  refreshTable();

  for (j = 0; j<6; j++){
  document.getElementsByClassName("sd1")[j].innerHTML = playerArray[0].name;
  document.getElementsByClassName("sd2")[j].innerHTML = playerArray[1].name;
  document.getElementsByClassName("sd3")[j].innerHTML = playerArray[2].name;
  document.getElementsByClassName("sd4")[j].innerHTML = playerArray[3].name;
  document.getElementsByClassName("sd5")[j].innerHTML = playerArray[4].name;
  document.getElementsByClassName("sd6")[j].innerHTML = playerArray[5].name;
  }


}

function createBracket(){

}

function refreshTable(){
  for (i = 0; i<playerArray.length; i++){
    var tpscore = "tp"+(i+1)+"score";
    var tpgames = "tp"+(i+1)+"games";
    document.getElementById(tpscore).innerHTML = playerArray[i].wins+"-"+playerArray[i].losses;
    document.getElementById(tpgames).innerHTML = 6 - (playerArray[i].wins+playerArray[i].losses);
  }
}

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
