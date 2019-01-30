/**
 * id
 * dogID
 * date
 * timeFrom
 * timeTo
 * walkerID
 */

const initState = [];

const walkingSchedule = (state = initState, action) => {
  let newState;
  switch (action.type) {
    case "DOG_REMOVE":
      return state.filter(record => record.dogID !== action.dogID);
    case "WALKING_SCHEDULE_ADD":
      newState = [...state];
      newState.push(action.record);
      return newState;
    case "WALKING_SCHEDULE_LOAD":
      return action.records
    case "WALKING_SCHEDULE_REMOVE":
      return state.filter(record => record.id !== action.recordID)
    default:
      return state;
  }
};

export default walkingSchedule;
