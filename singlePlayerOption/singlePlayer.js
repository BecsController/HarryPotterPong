document.addEventListener('DOMContentLoaded', start)

function start(){

var keys = {};
    keys.TWOUP = 38;    //keycode up arrow
    keys.TWODOWN = 40;  //keycode down arrow

var gameBoard = document.getElementsByClassName("gameBoard")[0];
var playerHighScore = document.getElementsByClassName("playerHighScore")[0];
var playerCurrentScore = document.getElementsByClassName("playerCurrentScore")[0];
var highScoreCount = 0;
var currentScoreCount = 0;

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

var movePieceOne = function(dy){
  playerOnePiece.y += dy;
  playerOnePiece.element.style.top = playerOnePiece.y + 'px';
};

var detectPieceMovement = function(){
    if ((playerOnePiece.y > 0) && (keys[keys.TWOUP])){
    movePieceOne(-5);
  } if ((playerOnePiece.y < 435) && (keys[keys.TWODOWN])){
    movePieceOne(5); //As long as p1piece is between 0 and 435 pixels it will move
  }
};

var ballStartDirection = 0;

function generateStartDirection(){
  var generatedDigit = Math.random();
  if (generatedDigit < 0.5){
    ballStartDirection = -5;
  } if (generatedDigit >= 0.5){
    ballStartDirection = 5;
  }
};
generateStartDirection();

setInterval(function(){
  detectPieceMovement();
  moveBall();
}, 1000/60); //function called 60 times per sec (smoothness of movement)

var ballX = ballStartDirection; //amount of pixels it moves by on x axis
var ballY = ballStartDirection;
var pieceOneX = 0 + 10;  //Left edge of gameboard + width of raquet
var pieceOneH = 198;
var pieceOneW = 10;

function moveBall(){
    if ((snitchBall.x < pieceOneX) && (snitchBall.x <= playerOnePiece.x + pieceOneW)
    && (snitchBall.y >= playerOnePiece.y) && (snitchBall.y <= playerOnePiece.y + pieceOneH)){ //if ball hits gryffindor raquet
    new Audio("../sound/Smack-SoundBible.com-1427823671.mp3").play()
    ballX = ballX + (0.1 * ballX);
    ballX = -ballX;
    currentScoreCount++;  //add to currentScore Count
    playerCurrentScore.innerHTML = currentScoreCount;
  } if (snitchBall.x > 865){ // if ball hits right side of game board
    ballX = -ballX;  //reverse direction
  } if (snitchBall.x < 0) { //if ball hits left side of game board
    new Audio("../sound/40_smith_wesson_single-mike-koenig.mp3").play()
    ballX = 5;
    ballY = 5;
    if (currentScoreCount > playerHighScore.innerHTML){
      playerHighScore.innerHTML = currentScoreCount;
      currentScoreCount = 0;
      playerCurrentScore.innerHTML = currentScoreCount;
      ballX = 5;
      ballY = 5;
    } else {
      currentScoreCount = 0;
      playerCurrentScore.innerHTML = currentScoreCount;
      ballX = 5;
      ballY = 5;
    }
  } if (snitchBall.y > 570){  //if ball hits height of gameboard reverse direction
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
