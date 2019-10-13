import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import './chat.css';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

const Chat = ({ location, socket }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect( () => {
        if(!location.search)
            window.location.replace('/');
        const { name, room } = queryString.parse(location.search);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => { 
            if(error) {
                alert(error);
                window.location.replace('/');
            }            
        });

    }, [ENDPOINT, location.search]);

    useEffect( () => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }  
    }, [messages]);

    useEffect( () => {
        socket.on('Typing', ({user}) => {
            setTyping(user);
            console.log(user);
        });
    });

    const sendMessage = event => {
        console.log(event);
        event.preventDefault();

        if(message)
            socket.emit('sendMessage', message, () => setMessage(''));
    }


    return (
         <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} typing={typing} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} socket={socket} name={name} room={room} />
            </div>
            <TextContainer users={users}/>
        </div>
    );
};

export default Chat;