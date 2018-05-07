document.addEventListener('DOMContentLoaded', start);

function start(){

var onePlayer = document.getElementById("OnePlayer");
var twoPlayer = document.getElementById("TwoPlayer");
var theme = document.querySelector('Audio');
theme.volume = 0.75;

onePlayer.addEventListener("click", function(){
  theme.play();                     //on click play sound
  soundDecrease();                  //call decrease function
  $(".container").fadeOut("3500");  //fade container out over 3.5 secs
  setTimeout(loadSingleGame, 7000); //pause for 7 secs before calling loadSingleGame
});

function soundDecrease(){
  var fade = setInterval(function(){
    if (theme.volume > 0){    //if volume is above 0
      theme.volume -= 0.05;  //decrease volume by 0.05
    } else {
      clearInterval(fade);   //and stop when reaches 0
    }
  }, 1000);                 //dec happens every second
};

function loadSingleGame(){
  window.location.replace("singlePlayerOption/indexSingle.html");
};

function loadMultiGame(){
  window.location.replace("twoPlayer/indextwoplay.html");
};

twoPlayer.addEventListener("click", function() {
  theme.play();
  soundDecrease();   
  $(".container").fadeOut("3500");
  setTimeout(loadMultiGame, 7000);
});

  $(".container").fadeIn(2500).css("display","block");

}
