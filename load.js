document.addEventListener('DOMContentLoaded', start);

function start(){

var onePlayer = document.getElementById("OnePlayer");
var twoPlayer = document.getElementById("TwoPlayer");
var theme = document.querySelector('Audio');

onePlayer.addEventListener("click", function(){
  theme.play();
  $(".container").fadeOut("3500");
  setTimeout(loadSingleGame, 7000);
});

function loadSingleGame(){
  window.location.replace("singlePlayerOption/indexSingle.html");
};

function loadMultiGame(){
  window.location.replace("twoPlayer/indextwoplay.html");
};

twoPlayer.addEventListener("click", function() {
  theme.play();
  $(".container").fadeOut("3500");
  setTimeout(loadMultiGame, 7000);
});

  $(".container").fadeIn(2500).css("display","block");

}
