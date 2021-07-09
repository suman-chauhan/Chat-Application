//client site
const socket = io("http://localhost:8000");

const form = document.getElementById('send-container');
const messegeinput=document.getElementById('messageinp')
const messageContainer=document.querySelector(".container");
var audio= new Audio('../ringtone.mp3');

form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const message=messegeinput.value;
    append(`You:  ${message} `,'right');
    socket.emit('send',message);
    messegeinput.value="";
});

const append =(message,position)=>
{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }

}
const name=prompt("enter Your name to join chat");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>
{
    append(`${name} Joined the chat `,'left');
})

socket.on('receive',data=>
{
    append(`${data.name}:${data.message} ` ,'left');
})

socket.on('left',name=>
{
    append(`${name} left the chat `,'left');
})
