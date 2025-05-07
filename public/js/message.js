const socket = io();  // Connect to the server

const senderUsername = localStorage.getItem('senderUsername');
const receiverUsername = localStorage.getItem('receiverUsername');

// Check if both usernames are available
if (senderUsername && receiverUsername) {
    console.log("Sender Username:", senderUsername);
    console.log("Receiver Username:", receiverUsername);
    
    // Emit the sender username to the server
    socket.emit('username', senderUsername);
}

// Handle message sending
const form = document.getElementById('message-form');
const messageInput = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message) return;

    socket.emit('sendMessage', {
        sender: senderUsername,
        receiver: receiverUsername,
        message: message
    });

    // Show message in chat window temporarily
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', 'message-sent');
    messageContainer.innerHTML = `<p><strong>${senderUsername}:</strong> ${message}</p><p><small>Sending...</small></p>`;
    document.getElementById('chat-history').appendChild(messageContainer);

    messageInput.value = '';
    messageInput.focus();
});

// Listen for received message
socket.on('receiveMessage', (data) => {
    const { sender, message, TimeStamp } = data;
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', 'message-received');
    messageContainer.innerHTML = `<p><strong>${sender}:</strong> ${message}</p><p><small>${new Date(TimeStamp).toLocaleString()}</small></p>`;
    document.getElementById('chat-history').appendChild(messageContainer);

    document.getElementById('chat-history').scrollTop = document.getElementById('chat-history').scrollHeight;
});

// Listen for message status (Message Sent)
socket.on('messageStatus', (data) => {
    const { status, message } = data;

    // Find the "Sending..." message and update it
    const sendingMessage = document.querySelector('.message-sent p small');
    if (sendingMessage) {
        sendingMessage.textContent = "Sent";
        sendingMessage.style.color = "green";
    }
});

const particleContainer = document.querySelector('.particles');
const particleCount = 50; // Adjust this to change the number of particles

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random duration for each particle
    particleContainer.appendChild(particle);
}
