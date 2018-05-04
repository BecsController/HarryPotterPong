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
  x: 412,
  y: 264, //approx the middle of the board
  element: document.getElementsByClassName("snitch")[0]
};


document.body.onkeyup=
document.body.onkeydown = function(e){
  var kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown'; //target specific key from array on press by keycode
};

var movePieceTwo = function(dy){
  playerTwoPiece.y += dy;  // y access point = value of dy
  playerTwoPiece.element.style.top = playerTwoPiece.y + 'px'; //turning dy into px from top of window
};

var movePieceOne = function(dy){
  playerOnePiece.y += dy;
  playerOnePiece.element.style.top = playerOnePiece.y + 'px';
};

var detectPieceMovement = function(){
  if ((playerTwoPiece.y > 0) && (keys[keys.TWOUP])){
    movePieceTwo(-15); //speed and direction piece moves on key ie amount of pixels from bottom
  } if ((playerTwoPiece.y < 435) && (keys[keys.TWODOWN])){
    movePieceTwo(15);  //how far goes down y axis
  } if ((playerOnePiece.y > 0) && (keys[keys.ONEUP])){
    movePieceOne(-15);
  } if ((playerOnePiece.y < 435) && (keys[keys.ONEDOWN])){
    movePieceOne(15); //As long as p1piece is between 0 and 435 pixels it will move
  }
};

setInterval(function(){
  detectPieceMovement();
  moveBall();
}, 1000/24); //function called 24 times per sec (smoothness of movement)

var ballX = 10; //amount of pixels it moves by on x axis
var ballY = 10;
var pieceTwoX = 860 - 48; //width of gameboard - width of raquet
var pieceTwoH = 198;  // height of raquet
var pieceOneX = 0 + 48;  //Left edge of gameboard + width of raquet

function moveBall(){
  if (snitchBall.x > pieceTwoX){ // width of gameboard
    ballX = -ballX;         // reverse direction of ball
  } if (snitchBall.x < pieceOneX){
    ballX = -ballX;
  } if (snitchBall.y > 570){  //height of gameboard
    ballY = -ballY;
  } if (snitchBall.y < 0){
    ballY = -ballY;
  }
  snitchBall.x += ballX;
  snitchBall.element.style.left = snitchBall.x + 'px';
  snitchBall.y += ballY;
  snitchBall.element.style.top = snitchBall.y + 'px';
};

}
