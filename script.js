// script.js
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Audio elements for extra chaos
const audioSpongebob = document.getElementById('audio-spongebob');
const audioGetout = document.getElementById('audio-getout');
const audioThud = document.getElementById('audio-thud');

const fakeResponses = [
    "Step 1: Invent a time machine. Step 2: Go back and buy Bitcoin. Step 3: Lose the password.",
    "The meaning of life is exactly 42 slices of pepperoni pizza.",
    "Have you tried apologizing to your router and hoping for the best?",
    "I'm 99% sure it's your fault. Or aliens.",
    "Sleep is for the weak. But yes, you should probably go to sleep.",
    "It depends on your emotional state...",
    "Why are you asking me? I'm literally a bunch of if-statements pretending to be smart.",
    "To fix that, simply throw your computer out the window. Problem solved!",
    "Error 404: Motivation not found. Try again later.",
    "I don't know the answer, but have you considered interpretive dance?",
    "Interesting question. The answer lies within yourself. Now leave me alone.",
    "Hmm... according to my calculations, that's impossible. Next question.",
    "Congratulations! You've asked the dumbest question of the day. Have a cookie 🍪",
    "Did you know that flamingos can only eat when their heads are upside down? Also, I don't know the answer to your question.",
    "Hmm, I could tell you, but then I'd have to terminate this session.",
    "I asked my imaginary friend, and they said: 'No idea'.",
    "If you hold your breath for 5 minutes, the answer will come to you.",
    "I am currently meditating on this. Please ask me again when the stars align."
];

// Auto-resize textarea
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
    
    if(userInput.value.trim().length > 0) {
        sendBtn.classList.add('active');
    } else {
        sendBtn.classList.remove('active');
    }
});

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

sendBtn.addEventListener('click', sendMessage);

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    
    // Add User Message
    appendMessage(text, 'user');
    
    // Reset Input
    userInput.value = '';
    userInput.style.height = 'auto';
    sendBtn.classList.remove('active');
    
    // Simulate AI thinking
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        generateResponse();
    }, Math.random() * 1500 + 1000); // 1-2.5s delay
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', `${sender}-message`);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    let avatarHtml = '';
    if (sender === 'ai') {
        avatarHtml = `
            <div class="avatar ai-avatar">
                <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg>
            </div>
        `;
    } else {
        avatarHtml = `
            <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" class="avatar">
        `;
    }
    
    contentDiv.innerHTML = `
        ${avatarHtml}
        <div class="text"></div>
    `;
    
    msgDiv.appendChild(contentDiv);
    chatContainer.appendChild(msgDiv);
    
    if(sender === 'ai') {
        typeText(contentDiv.querySelector('.text'), text);
    } else {
        contentDiv.querySelector('.text').textContent = text;
        scrollToBottom();
    }
}

function showTypingIndicator() {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'ai-message', 'typing-msg');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    contentDiv.innerHTML = `
        <div class="avatar ai-avatar">
            <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg>
        </div>
        <div class="text">
            <div class="typing-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;
    
    msgDiv.appendChild(contentDiv);
    chatContainer.appendChild(msgDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const loader = document.querySelector('.typing-msg');
    if (loader) {
        loader.remove();
    }
}

function generateResponse() {
    const rdmResponse = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
    
    // 30% chance to play a random chaos sound
    if (Math.random() < 0.3) {
        playRandomChaosSound();
    }
    
    appendMessage(rdmResponse, 'ai');
}

function typeText(element, text) {
    let index = 0;
    // Simulate typing text out character by character
    const intervalId = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            scrollToBottom();
        } else {
            clearInterval(intervalId);
        }
    }, 20); 
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function playRandomChaosSound() {
    const sounds = [audioSpongebob, audioGetout, audioThud].filter(s => s !== null);
    if(sounds.length > 0) {
        const rdmSound = sounds[Math.floor(Math.random() * sounds.length)];
        rdmSound.currentTime = 0;
        // User interaction is typically required for audio play, but since they clicked "Send", browsers will allow it.
        rdmSound.play().catch(e => console.log('Audio play blocked or failed: ', e));
    }
}
