const users = [];
const rooms = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  if(rooms.filter( ( { roomName } ) => roomName == room ).length == 0)
    rooms.push({ roomName: room, People: 1 });
  else {
    let i = rooms.findIndex( ({roomName}) => roomName == room );
    rooms[i].People += 1;
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = id => {
  let user;
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) {
    user = users.splice(index, 1)[0];

    let room = user.room;
    let i = rooms.findIndex( ({roomName}) => roomName == room );
    if( rooms[i].People == 1 )
      rooms.splice(i, 1);
    else
      rooms[i].People -= 1;

    
    return user;
  }
}

const getUser = id => users.find((user) => user.id === id);

const getUsersInRoom = room => users.filter((user) => user.room === room);

const getRooms = () => rooms;

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRooms };