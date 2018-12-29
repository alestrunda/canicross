const initState = {
  currentUserID: null
};

const app = (state = initState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        currentUserID: action.userID
      };
    case "USER_LOGOUT":
      return {
        ...state,
        currentUserID: null
      };
    case "USER_REGISTER":
      return {
        ...state,
        currentUserID: action.user.id
      };
    default:
      return state;
  }
};

export default app;
