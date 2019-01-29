export const dogAdd = dog => ({
  type: "DOG_ADD",
  dog
});

export const dogEdit = dog => ({
  type: "DOG_EDIT",
  dog
});

export const dogRemove = (dogID, userID) => ({
  type: "DOG_REMOVE",
  dogID,
  userID
});

export const dogScheduleAdd = (dogID, record) => ({
  type: "DOG_SCHEDULE_ADD",
  dogID,
  record
});

export const dogScheduleRemove = (dogID, record) => ({
  type: "DOG_SCHEDULE_REMOVE",
  dogID,
  record
});

export const dogsLoad = dogs => ({
  type: "DOGS_LOAD",
  dogs
});

export const setLanguage = language => ({
  type: "SET_LANGUAGE",
  language
})

export const userAddDog = (userID, dogID) => ({
  type: "USER_ADD_DOG",
  userID,
  dogID
});

export const userLogIn = userID => ({
  type: "USER_LOGIN",
  userID
});

export const userLogOut = () => ({
  type: "USER_LOGOUT"
});

export const userRegister = user => ({
  type: "USER_REGISTER",
  user
});

export const usersLoad = users => ({
  type: "USERS_LOAD",
  users
});

export const walkingScheduleAdd = record => ({
  type: "WALKING_SCHEDULE_ADD",
  record
});

export const walkingScheduleLoad = records => ({
  type: "WALKING_SCHEDULE_LOAD",
  records
});

export const walkingScheduleRemove = recordID => ({
  type: "WALKING_SCHEDULE_REMOVE",
  recordID
});
