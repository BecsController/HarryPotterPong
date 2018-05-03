document.addEventListener('DOMContentLoaded', start)

function start(){
  //code for raquets
var keys = {};
    keys.TWOUP = 38;    //keycode up arrow
    keys.TWODOWN = 40;  //keycode down arrow
    keys.ONEUP = 87;    //keycode W button
    keys.ONEDOWN = 83;  //keycode S button

var playerTwoPiece = {
  x: 49, //where piece starts on x axis comparative to elem start pos
  y: 0,  // where piece starts on y axis
  element: document.getElementsByClassName("slyGamePiece")[0]
};
var playerOnePiece = {
  x: 50,
  y: 0,
  element: document.getElementsByClassName("gryfGamePiece")[0]
};

document.body.onkeyup=
document.body.onkeydown = function(e){
  var kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown'; //target specific key from array on press by keycode
};

var movePieceTwo = function(dx, dy){
  playerTwoPiece.x += dx||0;
  playerTwoPiece.y += dy||0;
  playerTwoPiece.element.style.left = playerTwoPiece.x + 'px';
  playerTwoPiece.element.style.top = playerTwoPiece.y + 'px';
};

var movePieceOne = function(dx, dy){
  playerOnePiece.x += dx||0;
  playerOnePiece.y += dy||0;
  playerOnePiece.element.style.left = playerOnePiece.x + 'px';
  playerOnePiece.element.style.top = playerOnePiece.y + 'px';
};

var detectPieceTwoMovement = function(){
  if (keys[keys.TWOUP]){
    movePieceTwo(0, -5); //speed and direction piece moves on key
  } if (keys[keys.TWODOWN]){
    movePieceTwo(0, 5);
  } if (keys[keys.ONEUP]){
    movePieceOne(0, -5);
  } if (keys[keys.ONEDOWN]){
    movePieceOne(0, 5);
  }
};

setInterval(function(){
  detectPieceTwoMovement();
}, 1000/24);
}
