/**
 * id,
 * name,
 * age,
 * breed
 * schedule
 */

const initState = {};

const dogs = (state = initState, action) => {
  let newState;
  switch (action.type) {
    case "DOG_ADD":
      newState = JSON.parse(JSON.stringify(state)); //deep clone
      newState[action.dog.id] = {
        ...action.dog,
        schedule: []
      };
      return newState;
    case "DOG_EDIT":
      newState = JSON.parse(JSON.stringify(state)); //deep clone
      newState[action.dog.id] = {
        ...newState[action.dog.id],
        ...action.dog
      };
      return newState;
    case "DOG_REMOVE":
      newState = JSON.parse(JSON.stringify(state)); //deep clone
      delete newState[action.dogID];
      return newState;
    case "DOG_SCHEDULE_ADD":
      newState = JSON.parse(JSON.stringify(state)); //deep clone
      newState[action.dogID].schedule.push(action.record);
      newState[action.dogID].schedule.sort((a, b) => {
        return a.from - b.from;
      });
      return newState;
    case "DOG_SCHEDULE_REMOVE":
      newState = JSON.parse(JSON.stringify(state)); //deep clone
      newState[action.dogID].schedule = newState[action.dogID].schedule.filter(
        record =>
          !(
            record.from === action.record.from && record.to === action.record.to
          )
      );
      return newState;
    case "DOGS_LOAD":
      newState = {};
      action.dogs.forEach(dog => (newState[dog.id] = dog));
      return newState;
    default:
      return state;
  }
};

export default dogs;
