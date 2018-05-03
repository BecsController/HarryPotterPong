document.addEventListener('DOMContentLoaded', start)

function start(){
var keys = {};
    keys.TWOUP = 38;
    keys.TWODOWN = 40;

var playerOnePiece = document.getElementsByClassName("gryfGamePiece")[0];
var playerTwoPiece = {
  x: 875,     //where piece starts on x axis
  y: 440,       // where piece starts on y axis
  element: document.getElementsByClassName("slyGamePiece")[0]
};

document.body.onkeyup=
document.body.onkeydown = function(e){
  var kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown';
};

var movePieceTwo = function(dx, dy){
  playerTwoPiece.x += dx||0;
  playerTwoPiece.y += dy||0;
  playerTwoPiece.element.style.left = playerTwoPiece.x + 'px';
  playerTwoPiece.element.style.top = playerTwoPiece.y + 'px';
};

var detectPieceTwoMovement = function(){
  if (keys[keys.TWOUP]){
    movePieceTwo(0, -5); //speed and direction piece moves on key
  } if (keys[keys.TWODOWN]){
    movePieceTwo(0, 5);  //speed and direction piece moves on key
  }
};

setInterval(function(){
  detectPieceTwoMovement();
}, 1000/24);




}
