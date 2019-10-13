import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import RoomBox from '../RoomsBox/RoomsBox';
import './join.css';

const Join = ({ socket }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);

    useEffect( () => {
        socket.on('getRooms', ({ rooms }) => {
            setRooms(rooms);
        });
    },[rooms]);

    return (
        <div className="joinBackground">
            <div className='joinOuterContainer'>
                <div className='joinInnerContainer'><RoomBox rooms={rooms} setRoom={setRoom} /></div>
                <div className='joinInnerContainer'>
                    <h1 className='heading'> Join </h1>
                    <div> <input placeholder='Name' className='joinInput' type='text' onChange={ event => setName(event.target.value) } /> </div>
                    <div> <input placeholder='Room' className='joinInput mt-20' type='text' value={room} onChange={ ({ target: { value } }) => setRoom(value) } /> </div>
                    <Link onClick={ event => (!name || !room) ? event.preventDefault() : null } to={`/chat?name=${name}&room=${room}`}>
                        <button className="button mt-20" type='submit'>Connect</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Join;