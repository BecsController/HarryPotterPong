document.addEventListener('DOMContentLoaded', start)

function start(){

var keys = {};
    keys.TWOUP = 38;    //keycode up arrow
    keys.TWODOWN = 40;  //keycode down arrow
    keys.ONEUP = 87;    //keycode W button
    keys.ONEDOWN = 83;  //keycode S button

var gameBoard = document.getElementsByClassName("gameBoard")[0];
var playerOneScore = document.getElementsByClassName("playerOneScore")[0].innerHTML;
var playerTwoScore = document.getElementsByClassName("playerTwoScore")[0].innerHTML;

var playerTwoPiece = {
  x: 0, //where piece starts on x axis comparative to elem start pos
  y: 0,  // where piece starts on y axis
  element: document.getElementsByClassName("slyGamePiece")[0]
};
var playerOnePiece = {
  x: 0,
  y: 0,
  element: document.getElementsByClassName("gryfGamePiece")[0]
};
var snitchBall = {
  x: 0,
  y: 0,
  element: document.getElementsByClassName("snitch")[0]
};


document.body.onkeyup=
document.body.onkeydown = function(e){
  var kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown'; //target specific key from array on press by keycode
};

var movePieceTwo = function(dx, dy){
  playerTwoPiece.x += dx;
  playerTwoPiece.y += dy;
  playerTwoPiece.element.style.left = playerTwoPiece.x + 'px';
  playerTwoPiece.element.style.top = playerTwoPiece.y + 'px';
};

var movePieceOne = function(dx, dy){
  playerOnePiece.x += dx;
  playerOnePiece.y += dy;
  playerOnePiece.element.style.left = playerOnePiece.x + 'px';
  playerOnePiece.element.style.top = playerOnePiece.y + 'px';
};

var detectPieceMovement = function(){
  if (keys[keys.TWOUP]){
    movePieceTwo(0, -15); //speed and direction piece moves on key
  } if (keys[keys.TWODOWN]){
    movePieceTwo(0, 15);
  } if (keys[keys.ONEUP]){
    movePieceOne(0, -15);
  } if (keys[keys.ONEDOWN]){
    movePieceOne(0, 15);
  }
};

setInterval(function(){
  detectPieceMovement();
  settingRandomBall();
}, 1000/24); //function called 24 times per sec (smoothness of movement)

var moveSnitch = function(dx, dy){
  snitchBall.x += dx;
  snitchBall.y += dy;
  snitchBall.element.style.left = snitchBall.x + 'px';
  snitchBall.element.style.top = snitchBall.y + 'px';
};

function settingRandomBall(){
  if (Math.random() < 0.5){
    moveSnitch(0, -15);
  } else {
    moveSnitch(0, 15);
  }
};

}
