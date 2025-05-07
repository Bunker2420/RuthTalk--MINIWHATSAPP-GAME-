const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const pauseBtn = document.getElementById('pauseBtn');
const jumpSound = document.getElementById('jumpSound');
const gameOverSound = document.getElementById('gameOverSound');

let isJumping = false;
let isGameOver = false;
let score = 0;
let scoreInterval;
let isPaused = false;
let obstacleAnimationPaused = false;

function jump() {
  if (isJumping || isGameOver || isPaused) return;

  isJumping = true;
  dino.classList.add('jump');
  jumpSound.play();

  setTimeout(() => {
    dino.classList.remove('jump');
    isJumping = false;
  }, 600);
}

function startScoreCounter() {
  scoreInterval = setInterval(() => {
    if (!isPaused && !isGameOver) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }
  }, 500);
}

function checkCollision() {
  const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

  // Collision Detection
  if (obstacleLeft > 700 - 100 && obstacleLeft < 700 && dinoTop < 60) {
    gameOver();
  }
}

function gameOver() {
  isGameOver = true;
  clearInterval(scoreInterval);
  obstacle.style.animation = 'none';
  gameOverSound.play();
  restartBtn.style.display = 'inline-block';
}

function resetGame() {
  // Reset the game variables and styles
  isGameOver = false;
  isPaused = false;
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  restartBtn.style.display = 'none';
  obstacle.style.animation = 'moveObstacle 2s linear infinite';
  startScoreCounter();
}

function togglePause() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "▶ Resume" : "⏸ Pause";
  if (isPaused) {
    // Pause the game by stopping obstacle animation
    obstacle.style.animationPlayState = 'paused';
    clearInterval(scoreInterval);  // Stop the score counter
  } else {
    // Resume the game (start obstacle animation)
    obstacle.style.animationPlayState = 'running';
    startScoreCounter();  // Resume the score counter
  }
}

document.addEventListener("keydown", (e) => {
  if ((e.code === "Space" || e.key === "ArrowUp") && document.activeElement !== restartBtn && !isPaused) {
    e.preventDefault(); // Prevent default space/enter behavior
    jump();
  }

  if (e.key.toLowerCase() === "p") { // Press "P" to pause or resume the game
    togglePause();
  }
});

restartBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form-like behavior
  resetGame();
});

pauseBtn.addEventListener("click", () => {
  togglePause();
});

startScoreCounter();

setInterval(() => {
  if (!isGameOver && !isPaused) {
    checkCollision();  // Collision check only when game is not paused
  }
}, 50);
