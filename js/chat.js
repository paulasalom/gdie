const socket = io()

let message = document.getElementById('message');
let user = document.getElementById('user');
let btnchat = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btnchat.addEventListener('click', function(){
    socket.emit('chat:message', {
        message: message.value,
        user: user.value
    })
    message.value = ""
})

message.addEventListener("keyup", function (event) {
    if (event.key == 'Enter') {
        btnchat.click();
    }
});

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', user.value)
})

socket.on('chat:message', function (data) {
    actions.innerHTML = ''
    output.innerHTML += `<p>
        <strong>${data.user}</strong>: ${data.message}
    <p>`
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} is typing a message</em></p>`
});