const searchInput = document.getElementById("search");
const userList = document.getElementById("userList");

searchInput.addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    const users = userList.querySelectorAll(".user");

    users.forEach(user => {
        const username = user.textContent.toLowerCase();
        user.style.display = username.includes(filter) ? "block" : "none";
    });
});

function startChat(receiver) {
    window.location.href = `/chat/${receiver}`;
}

const emojis = ["✨", "🌟", "💬", "💖", "🪐", "👾", "🚀", "🌈", "🎯", "🔥"];
const container = document.querySelector(".emoji-bg");

function spawnEmoji() {
    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.top = `${Math.random() * 20 + 90}%`; // start off-screen
    emoji.style.animationDuration = `${4 + Math.random() * 6}s`;
    emoji.style.fontSize = `${1.2 + Math.random() * 2.5}rem`;
    emoji.style.color = "rgba(255,255,255,0.8)";
    container.appendChild(emoji);

    setTimeout(() => emoji.remove(), 10000);
}

setInterval(spawnEmoji, 400);