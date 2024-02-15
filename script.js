const cell=document.querySelectorAll('.cell');
const board=document.querySelector('.board');
const reset=document.querySelector('.reset');
const bnt=document.querySelector('.button');
var boardArray=['','','','','','','','',''];
const XO=['X','O'];

const win=
[[0,1,2],[3,4,5],[6,7,8],//rows
[0,3,6],[1,4,7],[2,5,8],//columns
[0,4,8],[2,4,6]];//diagonals
function XorO(){
    return XO[Math.floor(Math.random()*XO.length)];
}
function startGame(){
//document.querySelector('.endgame').style.display='none';
boardArray=Array.from(Array(9).keys());
for(let i=0;i<cell.length;i++){
    cell[i].innerText='';
    cell[i].style.removeProperty('background-color');
    cell[i].addEventListener('click',turnClick,false);
}
}
function turnClick(square){
turn(square.target.id,XorO());
}

function turn(squareId,player){
boardArray[squareId]=player;
console.log(boardArray);
document.getElementById(squareId).innerText=player;
let gameWon=checkWin(boardArray,player);
if(gameWon) gameOver(gameWon);
}


startGame();

