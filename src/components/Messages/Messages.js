import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import Typing from '../Typing/Typing';

import './messages.css';

const Messages = ({ messages, name, typing }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
    {typing ? <Typing typing={typing} /> : null}
  </ScrollToBottom>
);

export default Messages;