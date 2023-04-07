const socket = io();

let user;
let chatBox = document.getElementById('chatBox');

Swal.fire({
    title: "What's your nickname?",
    input: "text",
    text: 'Write your nickname to begin chatting',
    inputValidator: (value) => {
        return !value && "You need a nickname to continue"
    },
    allowOutsideClick: false,
}).then(result => {
    user = result.value;
    socket.emit('user-autenticated', user);
});

chatBox.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value });
            chatBox.value = '';
        }
    }
});

socket.on('messageLogs', data => {
    let logs = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages += `${message.user}: ${message.message}</br>`
    });
    logs.innerHTML = messages;
});

socket.on('user-connected', (data) => {
    Swal.fire({
        text: 'A new user has joined',
        toast: true,
        position: 'top-right',
        title: `${data} has joined the chat`,
        icon: 'success',
    });
});