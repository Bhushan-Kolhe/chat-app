import React from 'react';

import './input.css';

const Input = ({ setMessage, sendMessage, message, socket, name, room }) => {
  let typing = false;
  
  const onKeyPress = (event) => {
    let timeout;
    const timeoutTime = 1000;
    if( event.key ==='Enter')
      sendMessage(event);
    

    if(!typing){
      typing = true;
      socket.emit('startTyping', { name, room });
      timeout = setTimeout(stopTyping, timeoutTime);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(stopTyping, timeoutTime);
    }
  } 

  const stopTyping = () => {
    socket.emit('stopTyping', { room });
  }

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => onKeyPress(event)}
      />
      <button className="sendButton" onClick={event => sendMessage(event)}>Send</button>
    </form>
  )
}

export default Input;