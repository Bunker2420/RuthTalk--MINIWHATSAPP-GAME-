const guessBtn = document.getElementById("guessBtn");
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");

let numberToGuess = Math.floor(Math.random() * 100) + 1;
let score = 0;

guessBtn.addEventListener("click", () => {
  const guess = parseInt(guessInput.value);
  if (isNaN(guess)) {
    message.textContent = "Please enter a valid number!";
    return;
  }

  if (guess === numberToGuess) {
    message.textContent = `🎉 Correct! The number was ${numberToGuess}.`;
    score += 10;
    numberToGuess = Math.floor(Math.random() * 100) + 1;
  } else if (guess < numberToGuess) {
    message.textContent = "📉 Too low! Try again.";
    score -= 1;
  } else {
    message.textContent = "📈 Too high! Try again.";
    score -= 1;
  }

  scoreDisplay.textContent = `Score: ${score}`;
  guessInput.value = "";
});

// Page Loader Timeout
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.display = "none";
  }, 1500);
});

// Create floating particles (bubbles)
function createParticles() {
    const container = document.getElementById("particles-container");
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      const size = Math.random() * 10 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${6 + Math.random() * 10}s`;
      container.appendChild(particle);
  
      setTimeout(() => particle.remove(), 16000);
    }
}
  
setInterval(createParticles, 1000);
