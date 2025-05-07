let userScore = 0;
let computerScore = 0;

function play(userChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    const loading = document.getElementById("loading");
    const resultDisplay = document.getElementById("result");
    const userDisplay = document.getElementById("user-choice");
    const compDisplay = document.getElementById("computer-choice");

    resultDisplay.innerText = "";
    userDisplay.innerText = "";
    compDisplay.innerText = "";

    loading.style.display = "block";

    setTimeout(() => {
        loading.style.display = "none";

        userDisplay.innerText = `You chose: ${emoji(userChoice)} (${userChoice})`;
        compDisplay.innerText = `Computer chose: ${emoji(computerChoice)} (${computerChoice})`;

        const result = getResult(userChoice, computerChoice);
        resultDisplay.innerText = result;

        if (result.includes("Win")) userScore++;
        else if (result.includes("Lose")) computerScore++;

        document.getElementById("user-score").innerText = userScore;
        document.getElementById("computer-score").innerText = computerScore;
    }, 1000);
}

function getResult(user, computer) {
    if (user === computer) return "🤝 It's a Draw!";
    if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) {
        return "🎉 You Win!";
    }
    return "💥 You Lose!";
}

function emoji(choice) {
    switch (choice) {
        case "rock": return "🪨";
        case "paper": return "📄";
        case "scissors": return "✂️";
    }
}

// Background emoji animation
const emojiBg = document.querySelector(".emoji-bg");
const floatEmojis = ["🔥", "✨", "🎮", "🌟", "💥", "🎲"];

function spawnEmoji() {
    const e = document.createElement("div");
    e.classList.add("emoji");
    e.innerText = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
    e.style.left = Math.random() * 100 + "vw";
    e.style.fontSize = 1.5 + Math.random() * 2 + "rem";
    e.style.animationDuration = 6 + Math.random() * 4 + "s";
    emojiBg.appendChild(e);
    setTimeout(() => e.remove(), 10000);
}

setInterval(spawnEmoji, 600);
