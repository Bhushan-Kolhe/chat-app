import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './roomsBox.css';

const RoomBox = ( { rooms, setRoom } ) => {
    return (
        <div className="RoomsContainer">
            <h1 className = "heading mr-20"> Current Rooms </h1>
            <ScrollToBottom className="RoomBox">
                { rooms.map( (room) => <button onClick={ event => setRoom(room.roomName)} className="room mb-10"><span>{room.roomName}</span> <span>{room.People}</span></button> ) }
            </ScrollToBottom>
        </div>
    );
}

export default RoomBox;