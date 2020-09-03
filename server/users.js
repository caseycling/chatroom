const users = [];

const addUser = ({ id, name, room }) => {
  //Make name one word, no spaces and all lowercase
  name = name.trim().toLowercase();
  room = room.trim().toLowercase();

  //Check if new user's name already exists in the chatroom
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, name, room };

  //Push new user to array of users
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  //Find user by id
  const index = users.findIndex((user) => user.id === id);

  //Remove user from array of users
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

//Find user by id
const getUser = (id) => users.find((user) => user.id === id);

//Get all users in room by room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, getUser, removeUser, getUsersInRoom };
