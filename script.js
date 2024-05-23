
// DOM elements
const cell=document.querySelectorAll('.cell');
const board=document.querySelector('.board');
const reset=document.querySelector('.reset');
const bnt=document.querySelector('.button');
var youCount=document.querySelector(".you");
var aiCount=document.querySelector(".ai");
var TieCount=document.querySelector(".tie");
// UI elements for player turns
let turnX=document.querySelector('.turnText.X');
let turnO=document.querySelector('.turnText.O');
// Game state
var boardArray=['','','','','','','','',''];
const XO=['X','O'];
// Randomly assign human and AI symbols
let human=XO[Math.floor(Math.random()*XO.length)];
let ai=(human==='X')?'O':'X';
console.log("Human:"+human);
console.log("AI:"+ai);

// Winning combinations on the board
const win=
[[0,1,2],[3,4,5],[6,7,8],//rows
[0,3,6],[1,4,7],[2,5,8],//columns
[0,4,8],[2,4,6]];//diagonals

// Game initialization function
function startGame(){
document.querySelector('.endgame').style.display='none';
boardArray=Array.from(Array(9).keys());
    // Set up the event listeners for each cell on the board
for(let i=0;i<cell.length;i++){
    cell[i].innerText='';// Clear the cell content
    cell[i].style.removeProperty('background-color');
    cell[i].addEventListener('click',turnClick,false);
}
}

// Function to handle player's turn when a cell is clicked
function turnClick(square){
    if(typeof boardArray[square.target.id]=="number"){
                // Make the player's move
        turn(square.target.id,human);
        // Update UI for the current player's turn 
        //there is problem in this part
        if (human === 'X') {
            turnX.style.backgroundColor = '#40A2E3'; // X color
            turnO.style.backgroundColor = ''; // Default O color
        } else {
            turnO.style.backgroundColor = '#D04848'; // O color
            turnX.style.backgroundColor = ''; // Default X color
        }
        // Allow a short delay before AI makes its move
        setTimeout(function(){
                        // Check for game end conditions and make AI move if needed
            if(!checkTie()&&checkWin(boardArray,human)==null){
            turn(bestSpot(),ai)};
        },100);
}
}
// Function to handle a player's move
function turn(squareId,player){
boardArray[squareId]=player;
console.log(boardArray);
document.getElementById(squareId).innerText=player; // Update the game board
let gameWon=checkWin(boardArray,player); 
if(gameWon){gameOver(gameWon)};
        // Update UI for the current player's turn 
        //there is problem in this part
if (player === 'X') {
    turnX.style.backgroundColor = '#D04848'; // X color
    turnO.style.backgroundColor = ''; // Default O color
} else {
    turnO.style.backgroundColor = '#40A2E3'; // O color
    turnX.style.backgroundColor = ''; // Default X color
}
}
// Function to check for a winning condition on the board
function checkWin(board,player){
let plays=board.reduce((a,e,i)=> 
(e===player)?a.concat(i):a,[]);
let gameWon=null;
for(let [index,winning]of win.entries()){
    if(winning.every(elem=>plays.indexOf(elem)>-1)){
        gameWon={index:index,player:player};
        break;
    }
}
return gameWon;
}

function winner(who){
    document.querySelector('.endgame').style.display='block';
    document.querySelector('.who').innerText=who;

}
// Function to handle end of the game
function gameOver(gameWon){
for(let index of win[gameWon.index]){
    document.getElementById(index).style.backgroundColor=
    gameWon.player==="X"?'#40A2E3':'#D04848';
    document.querySelector('.who').style.color=gameWon.player==="X"?'#40A2E3':'#D04848';
    document.querySelector('.who').style.fontWeight='bold';
    document.querySelector('.who').style.fontSize='30px';

}
for(let i=0;i<cell.length;i++){
cell[i].removeEventListener('click',turnClick,false);
}
winner(gameWon.player===human?`You Win🎉`:`You Lose😭`);
if(gameWon.player===human){
    youCount.innerHTML++;
}else{
    aiCount.innerHTML++;
}
}
// Function to find empty squares on the board
function emptySquares(){
    return boardArray.filter(s=>typeof s=='number');
}

// Function to find the best spot for the AI to move
function bestSpot(){
return minmax(boardArray,ai).index;
}

// Function to check for a tie game
function checkTie(){
if(emptySquares().length==0&&!checkWin(boardArray,human)&&!checkWin(boardArray,ai)){
    for(let i=0;i<cell.length;i++){
        cell[i].style.backgroundColor='green';
        cell[i].removeEventListener('click',turnClick,false);
    }
TieCount.innerHTML++;
winner(`Tie Game🤯`);
return true;
}
return false;
}


// Minimax algorithm for AI to play the best move possible
function minmax(newBoard,player){
let freespot=emptySquares(newBoard);
if(checkWin(newBoard,human)){
    return {score:-10};
}else if(checkWin(newBoard,ai)){
    return {score:10};
}else if(freespot.length===0){
    return {score:0};
}
let moves=[];
for (let i=0;i<freespot.length;i++){
let move={};
move.index=newBoard[freespot[i]];
newBoard[freespot[i]]=player;
if(player==ai){
    let result=minmax(newBoard,human);
    move.score=result.score;
}else{
    let result=minmax(newBoard,ai);
    move.score=result.score;
}newBoard[freespot[i]]=move.index;
moves.push(move);
}
let bestMove;
if(player===ai){
let bestScore=-500;
for(let i=0;i<moves.length;i++){
    if(moves[i].score>bestScore){
        bestScore=moves[i].score;
        bestMove=i;
    }
}
}else{
    let bestScore=500;
    for(let i=0;i<moves.length;i++){
        if(moves[i].score<bestScore){
            bestScore=moves[i].score;
            bestMove=i;
        }
    }
}
    // Return the best move found
return moves[bestMove];
}

// Start the game
startGame();
