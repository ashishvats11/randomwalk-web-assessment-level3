let currentPlayer;
let board;
let gameActive;
let scores;
let playerXName = 'Player X';
let playerOName = 'Player O';

const boardElement = document.getElementById('board');
const scorecardElement = document.getElementById('scorecard');
const playerXNameInput = document.getElementById('playerXName');
const playerONameInput = document.getElementById('playerOName');
const currentTurnElement = document.getElementById('currentTurn');
const restartButton = document.getElementById('restartButton');
const turnDisplay = document.getElementById('turnDisplay');

// Set Player Names
function setPlayerNames() {
    playerXName = playerXNameInput.value || 'Player X';
    playerOName = playerONameInput.value || 'Player O';
    startGame();
}

// Start Game
function startGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    scores = { 'X': 0, 'O': 0 };
    boardElement.innerHTML = '';
    updateScorecard();
    createBoard();
    updateCurrentTurnDisplay();
    turnDisplay.style.display = 'none';
    restartButton.style.display = 'none';
}

// Create the board
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i.toString();
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

// Update Scorecard
function updateScorecard() {
    scorecardElement.textContent = `${playerXName}: ${scores['X']} | ${playerOName}: ${scores['O']}`;
}

// Update Current Turn Display
function updateCurrentTurnDisplay() {
    currentTurnElement.textContent = currentPlayer === 'X' ? playerXName : playerOName;
}

// Handle Cell Click
function handleCellClick(event) {
    const cellIndex = parseInt(event.target.dataset.index);
    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    let winInfo = checkForWin();
    if (winInfo.isWin) {
        gameActive = false;
        scores[currentPlayer]++;
        highlightWinningCells(winInfo.winningCombination);
        setTimeout(() => {
            alert(`${currentPlayer === 'X' ? playerXName : playerOName} wins!`);
            updateScorecard();
        }, 500); 
        turnDisplay.style.display = 'block';
        restartButton.style.display = 'block';
        return;
    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
        setTimeout(() => {
            alert('Draw!');
        }, 500); 
        turnDisplay.style.display = 'block';
        restartButton.style.display = 'block';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentTurnDisplay();
}

// Check for Win
function checkForWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let condition of winConditions) {
        if (condition.every(index => board[index] === currentPlayer)) {
            return { isWin: true, winningCombination: condition };
        }
    }

    return { isWin: false };
}

// Highlight Winning Cells
function highlightWinningCells(winningCombination) {
    winningCombination.forEach(index => {
        const winningCell = boardElement.children[index];
        winningCell.classList.add('winning-cell');
    });
}

// Restart Game
function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    boardElement.innerHTML = '';
    createBoard();
    updateCurrentTurnDisplay();
    updateScorecard();
    turnDisplay.style.display = 'block';
    restartButton.style.display = 'block';
}

