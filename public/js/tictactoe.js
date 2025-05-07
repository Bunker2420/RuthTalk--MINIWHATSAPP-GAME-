const cells = document.querySelectorAll("[data-cell]");
const restartButton = document.querySelector(".restart-btn");
const currentTurnElement = document.getElementById("current-turn");
const winMessageElement = document.getElementById("win-message");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Player X starts (User)
let gameOver = false;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle player move
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (gameOver || board[index]) return; // Ignore if game over or cell is occupied

        // Player makes a move (X)
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Check for win after user move
        if (checkWin()) {
            setTimeout(() => {
                winMessageElement.textContent = "X wins!";
                winMessageElement.style.display = "block";
                winMessageElement.classList.add("winning-animation");
                startConfetti(); // Start confetti when X wins
            }, 200);
            highlightWinningCells();
            gameOver = true;
            return;
        } else if (board.every(cell => cell)) {
            setTimeout(() => {
                winMessageElement.textContent = "It's a draw!";
                winMessageElement.style.display = "block";
            }, 200);
            gameOver = true;
            return;
        }

        // Switch to computer (O) turn
        currentPlayer = "O";
        currentTurnElement.textContent = "O's Turn";

        // Computer makes a move after delay
        setTimeout(computerMove, 500); // Computer plays after a small delay
    });
});

// Computer makes a move
function computerMove() {
    if (gameOver) return;

    let emptyCells = [];
    board.forEach((value, index) => {
        if (!value) emptyCells.push(index); // Collect all empty cells
    });

    if (emptyCells.length === 0) return;

    // Pick a random empty cell for the computer
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // Computer makes a move (O)
    board[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    // Check for win after computer move
    if (checkWin()) {
        setTimeout(() => {
            winMessageElement.textContent = "O wins!";
            winMessageElement.style.display = "block";
            winMessageElement.classList.add("winning-animation");
            startConfetti(); // Start confetti when O wins
        }, 200);
        highlightWinningCells();
        gameOver = true;
        return;
    } else if (board.every(cell => cell)) {
        setTimeout(() => {
            winMessageElement.textContent = "It's a draw!";
            winMessageElement.style.display = "block";
        }, 200);
        gameOver = true;
        return;
    }

    // Switch to user (X) turn
    currentPlayer = "X";
    currentTurnElement.textContent = "X's Turn";
}

// Check for a winner
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Highlight the winning cells with animation
function highlightWinningCells() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add("winning-cell");
            cells[b].classList.add("winning-cell");
            cells[c].classList.add("winning-cell");
        }
    }
}

// Start confetti animation
function startConfetti() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ff9900']
    });
}

// Reset the game
restartButton.addEventListener("click", () => {
    // Reset the board and game state
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;

    // Clear the board UI
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-cell"); // Remove winning cell class
    });

    // Hide the win message and reset the animations
    winMessageElement.style.display = "none";
    winMessageElement.classList.remove("winning-animation");

    // Reset the turn indicator
    currentTurnElement.textContent = "X's Turn";

    // Stop confetti and reset if it's playing
    stopConfetti();
});

// Stop the confetti animation
function stopConfetti() {
    confetti.reset();
}
