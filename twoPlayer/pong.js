document.addEventListener('DOMContentLoaded', start);

function start(){
$(".container").fadeIn(2500).css("display","block");
var keys = {};
    keys.TWOUP = 38;    //keycode up arrow
    keys.TWODOWN = 40;  //keycode down arrow
    keys.ONEUP = 87;    //keycode W button
    keys.ONEDOWN = 83;  //keycode S button

var gameBoard = document.getElementsByClassName("gameBoard")[0];
var playerOneScore = document.getElementsByClassName("playerOneScore")[0];
var playerTwoScore = document.getElementsByClassName("playerTwoScore")[0];
var resetScores = document.getElementById("reset");
var scoreCountOne = 0;
var scoreCountTwo = 0;
var homePage = document.getElementById("homePage");

homePage.addEventListener("click", function(){
  location.href = "https://rebdugnz.github.io/HarryPotterPong/";
});

resetScores.addEventListener("click", function(){
  scoreCountOne = 0;
  scoreCountTwo = 0;
  playerOneScore.innerHTML = scoreCountOne;
  playerTwoScore.innerHTML = scoreCountTwo;
}); //set score counts back to zero and push to div

var playerTwoPiece = {
  x: 904, //where piece starts on x axis comparative to elem start pos
  y: 410,  // where piece starts on y axis
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
  } if ((playerTwoPiece.y < 407) && (keys[keys.TWODOWN])){
    movePieceTwo(5);  //how far goes down y axis
  } if ((playerOnePiece.y > 0) && (keys[keys.ONEUP])){
    movePieceOne(-5);
  } if ((playerOnePiece.y < 407) && (keys[keys.ONEDOWN])){
    movePieceOne(5); //As long as p1piece is between 0 and 435 pixels it will move
  }
};

function setSlyPieceDefaultPosition(){
  playerTwoPiece.element.style.left = playerTwoPiece.x + 'px';
  playerTwoPiece.element.style.top = playerTwoPiece.y + 'px';
}; //set raquet two paddle position to bottom right

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
  setSlyPieceDefaultPosition();
  detectPieceMovement();
  moveBall();
}, 1000/60); //function called 60 times per sec (smoothness of movement)

var ballX = ballStartDirection; //amount of pixels it moves by on x axis
var ballY = ballStartDirection;
var pieceTwoX = 865 - 10; //width of gameboard - width of raquet
var pieceTwoH = 198;  // height of raquet
var pieceOneX = 0 + 10;  //Left edge of gameboard + width of raquet
var pieceOneH = 198;
var pieceOneW = 10;
var pieceTwoW = 10;

function moveBall(){
  if ((snitchBall.x > pieceTwoX) && (snitchBall.x <= playerTwoPiece.x + pieceTwoW)
  && (snitchBall.y >= playerTwoPiece.y) && (snitchBall.y <= playerTwoPiece.y + pieceTwoH)){ // if ball hits slytherin raquet
    new Audio("../sound/Banana_Slap-AngryFlash-2001109808.mp3").play()
    ballX = ballX + (0.1 * ballX);
    ballX = -ballX;         // reverse direction of ball
  } if ((snitchBall.x < pieceOneX) && (snitchBall.x <= playerOnePiece.x + pieceOneW)
  && (snitchBall.y >= playerOnePiece.y) && (snitchBall.y <= playerOnePiece.y + pieceOneH)){ //if ball hits gryffindor raquet
    new Audio("../sound/Smack-SoundBible.com-1427823671.mp3").play()
    ballX = ballX + (0.1 * ballX);
    ballX = -ballX;
  } if (snitchBall.x > 865){ // if ball hits right side of game board
    scoreCountOne++; // increase score of player one
    playerOneScore.innerHTML = scoreCountOne; //set score to score board
    new Audio("../sound/40_smith_wesson_single-mike-koenig.mp3").play()
    ballX = -ballX;  //reverse direction
    ballX = -5;     //reset to start speed
    ballY = -5;
  } if (snitchBall.x < 0) { //if ball hits left side of game board
    scoreCountTwo++;
    playerTwoScore.innerHTML = scoreCountTwo;
    new Audio("../sound/40_smith_wesson_single-mike-koenig.mp3").play()
    ballX = -ballX;
    ballX = 5;
    ballY = 5;
  } if (snitchBall.y > 550){  //if ball hits height of gameboard reverse direction
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
