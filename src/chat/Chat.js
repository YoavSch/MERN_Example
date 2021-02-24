import React, { useState , useEffect} from "react";
import io from 'socket.io-client';
import ChatLog from "./ChatLog";
import './Chat.css'


const socket = io.connect('http://localhost:4000');

function Chat(){
  const [userMessage, setUserMessage] = useState({name : '', message : ''});
  const [messages, setMessages] = useState([]);


  useEffect(()=>{
     socket.on('message', ({name , message})=>{
       setMessages([...messages, {name, message}]);
     })
  });

  const onMessageSubmit = e => {
    e.preventDefault();
    socket.emit('message', {name : userMessage.name, message : userMessage.message});
    setUserMessage({message : '', name : ''})
  }

  const onTextChange = e => {
    setUserMessage({ ...userMessage, [e.target.name]: e.target.value });
  }

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
         <h1>Name</h1>
         <div className="name-field">
           <input
              placeholder="name"
              name="name"
              value={userMessage.name}
              onChange={e => onTextChange(e)}
              label="Name"
              />
         </div>
         <h1>Message</h1>
         <div className="name-field">
           <input
              placeholder="message"
              name="message"
              value={userMessage.message}
              onChange={e => onTextChange(e)}
              label="Message"
              />
         </div>
         <button>Send Message</button>
      </form>
      <div className="render-chat">
          <h1>Chat Log</h1>
          <ChatLog messages={messages}/>
      </div>
    </div>
  )
}

export default Chat;