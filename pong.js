document.addEventListener('DOMContentLoaded', start)

function start(){

var keys = {};
    keys.TWOUP = 38;    //keycode up arrow
    keys.TWODOWN = 40;  //keycode down arrow
    keys.ONEUP = 87;    //keycode W button
    keys.ONEDOWN = 83;  //keycode S button

var gameBoard = document.getElementsByClassName("gameBoard")[0];
var playerOneScore = document.getElementsByClassName("playerOneScore")[0];
var playerTwoScore = document.getElementsByClassName("playerTwoScore")[0];
var scoreCountOne = 0;
var scoreCountTwo = 0;
var hitCount = 0;

var playerTwoPiece = {
  x: 875, //where piece starts on x axis comparative to elem start pos
  y: 440,  // where piece starts on y axis
  element: document.getElementsByClassName("slyGamePiece")[0]
};
var playerOnePiece = {
  x: 0,
  y: 0,
  element: document.getElementsByClassName("gryfGamePiece")[0]
};
var snitchBall = {
  x: 412,
  y: 245, //approx the middle of the board
  element: document.getElementsByClassName("snitch")[0]
};


document.body.onkeyup=
document.body.onkeydown = function(e){
  var kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown'; //target specific key from array on press by keycode
};

var movePieceTwo = function(dy){
  playerTwoPiece.y += dy;  // y pos + value of dy in pixels
  playerTwoPiece.element.style.top = playerTwoPiece.y + 'px'; //turning dy into px from top of window
};

var movePieceOne = function(dy){
  playerOnePiece.y += dy;
  playerOnePiece.element.style.top = playerOnePiece.y + 'px';
};

var detectPieceMovement = function(){
  if ((playerTwoPiece.y > 0) && (keys[keys.TWOUP])){
    movePieceTwo(-5); //speed and direction piece moves on key ie amount of pixels from bottom
  } if ((playerTwoPiece.y < 435) && (keys[keys.TWODOWN])){
    movePieceTwo(5);  //how far goes down y axis
  } if ((playerOnePiece.y > 0) && (keys[keys.ONEUP])){
    movePieceOne(-5);
  } if ((playerOnePiece.y < 435) && (keys[keys.ONEDOWN])){
    movePieceOne(5); //As long as p1piece is between 0 and 435 pixels it will move
  }
};
function setSlyPieceDefaultPosition(){
  playerTwoPiece.element.style.left = playerTwoPiece.x + 'px';
  playerTwoPiece.element.style.top = playerTwoPiece.y + 'px';
};

setInterval(function(){
  setSlyPieceDefaultPosition();
  detectPieceMovement();
  moveBall();
}, 1000/60); //function called 60 times per sec (smoothness of movement)

var ballX = 5; //amount of pixels it moves by on x axis
var ballY = 5;
var pieceTwoX = 860 - 48; //width of gameboard - width of raquet
var pieceTwoH = 198;  // height of raquet
var pieceOneX = 0 + 48;  //Left edge of gameboard + width of raquet
var pieceOneH = 198;

function moveBall(){
  if ((snitchBall.x > pieceTwoX) && (snitchBall.y >= playerTwoPiece.y)
  && (snitchBall.y <= playerTwoPiece.y + pieceTwoH)){ // if ball hits slytherin raquet
    hitCount++;     //keep track of how many time ball hits a raquet
    ballX = -ballX;         // reverse direction of ball
  } if ((snitchBall.x < pieceOneX) && (snitchBall.y >= playerOnePiece.y)
  && (snitchBall.y <= playerOnePiece.y + pieceOneH)){ //if ball hits gryffindor raquet
    hitCount++;
    ballX = -ballX;
  } if (snitchBall.x > 860){ // if ball hits right side of game board
    scoreCountOne++; // increase score of player one
    playerOneScore.innerHTML = scoreCountOne; //set score to score board
    ballX = -ballX;
  } if (snitchBall.x < 0) { //if ball hits left side of game board
    scoreCountTwo++;
    playerTwoScore.innerHTML = scoreCountTwo;
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
