import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

let socket;

const App = () => {
    const ENDPOINT = '/';
    socket = io(ENDPOINT);

    return (
        <Router>
            <Route path='/' exact render={ (props) => <Join {...props} socket={socket} /> } />
            <Route path='/chat' render={ (props) => <Chat {...props} socket={socket} /> } />
        </Router>
    )
};

export default App;