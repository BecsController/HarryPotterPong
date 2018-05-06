document.addEventListener('DOMContentLoaded', start);

function start(){

var onePlayer = document.getElementById("OnePlayer");
var twoPlayer = document.getElementById("TwoPlayer");

onePlayer.addEventListener("click", function(){
  $(".container").fadeOut("3500");
  setTimeout(loadSingleGame, 7000);
});

function loadSingleGame(){
  window.location.replace("singlePlayerOption/indexSingle.html");
};

function loadMultiGame(){
  window.location.replace("twoPlayer/index.html");
};

twoPlayer.addEventListener("click", function() {
  $(".container").fadeOut("3500");
  setTimeout(loadMultiGame, 7000);
});

  var a = document.querySelector('Audio');

  function pausePlay() {
    console.log('Will now try to pause video and play it again in same eventloop');
    a.pause();
    a.play();
  }
  window.onload = function() {
    a.play();
    setInterval(pausePlay, 1000);
  };

  $(".container").fadeIn(2500).css("display","block");

}
