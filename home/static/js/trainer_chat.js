const userList = document.querySelector('.user-list');
const chatArea = document.querySelector('.chat-area');
const chatMessages = document.querySelector('.chat-messages');
const messageInput = document.querySelector('.message-input');
const sendMessageButton = document.querySelector('.send-message');

// Initial state
let currentUsername = 'john'; // Assuming 'john' is the initially active user

// Mock chat data (replace with your actual data source)
const chatData = {
    john: [
        { from: 'jane', message: 'Hi John!' },
        { from: 'you', message: 'Hello Jane!' }
    ],
    jane: [
        { from: 'john', message: 'Hey Jane!' },
        { from: 'you', message: 'Good to hear from you!' }
    ],
    alice: [], // No messages yet
    bob: [], // No messages yet
};

// Update chat view based on the selected user
function updateChatView(username) {
    currentUsername = username;
    const messages = chatData[username] || []; // Handle potential missing data

    // Clear previous messages
    chatMessages.innerHTML = '';

    // Display new messages
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(message.from === 'you' ? 'from-me' : 'from-you');
        messageElement.textContent = `${message.from}: ${message.message}`;
        chatMessages.appendChild(messageElement);
    });

    // Update chat title
    const chatTitle = document.querySelector('.chat-title');
    chatTitle.textContent = `Chat with: ${username}`;

    // Scroll to the bottom of the chat area
    chatMessages.scrollTo(0, chatMessages.scrollHeight);
}

// Handle user selection
userList.addEventListener('click', (event) => {
    const selectedUser = event.target.closest('.user');
    if (selectedUser && selectedUser.dataset.username !== currentUsername) {
        // remove class from user 
        userList.querySelectorAll('.user').forEach(user => {
            user.classList.remove('active');
        });
        selectedUser.classList.add('active');
        updateChatView(selectedUser.dataset.username);
    }
});

// Handle message sending with Enter key or Send button
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // Prevent default form submission behavior
        event.preventDefault();

        const message = messageInput.value.trim();
        if (message) {
            // Handle adding the message to chat data and updating UI
            chatData[currentUsername].push({ from: 'you', message });
            updateChatView(currentUsername);
            messageInput.value = ''; // Clear the input field
        }
    }
});

// Handle message sending
sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        chatData[currentUsername].push({ from: 'you', message });
        updateChatView(currentUsername);
        messageInput.value = ''; // Clear the input field
    }
});

// Update the initial chat view based on currentUsername
updateChatView(currentUsername);


let isSidebarOpen = true;
const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (isSidebarOpen) {
        sidebar.classList.add('hidden');
    } else {
        sidebar.classList.remove('hidden');
    }
    isSidebarOpen = !isSidebarOpen;
};

const toggleSidebarButton = document.querySelector('.chat-settings'); // Assuming you have a button for this
if (toggleSidebarButton) {
    toggleSidebarButton.addEventListener('click', toggleSidebar);
}

// Cool design enhancement (optional)
const messageElements = chatMessages.querySelectorAll('.message');

if (messageElements.length > 0) {
    const lastMessage = messageElements[messageElements.length - 1];
    const lastMessageTop = lastMessage.offsetTop; // Get the top position of the last message
    chatMessages.scrollTop = lastMessageTop; // Scroll to the bottom
}