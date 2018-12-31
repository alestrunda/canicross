/**
 * id
 * name
 * email
 * password
 * userType
 * dogIDs
 */

const initState = {};

const users = (state = initState, action) => {
  let newState, userDogIDs, targetIndex;

  switch (action.type) {
    case "DOG_REMOVE":
      newState = JSON.parse(JSON.stringify(state)); //deep copy
      userDogIDs = newState[action.userID].dogIDs;
      targetIndex = userDogIDs.indexOf(action.dogID);
      userDogIDs = userDogIDs.splice(targetIndex, 1);
      return newState;
    case "USER_ADD_DOG":
      newState = JSON.parse(JSON.stringify(state)); //deep copy
      newState[action.userID].dogIDs.push(action.dogID);
      return newState;
    case "USER_REGISTER":
      newState = JSON.parse(JSON.stringify(state)); //deep copy
      newState[action.user.id] = action.user;
      return newState;
    case "USERS_LOAD":
      newState = {};
      action.users.forEach(user => (newState[user.id] = user));
      return newState;
    default:
      return state;
  }
};

export default users;
