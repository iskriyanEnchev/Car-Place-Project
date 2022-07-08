const INITIAL_STATE = {
    // isUserLoggedIn: false
    user: null
  };
  
  const loginReducer = (state = INITIAL_STATE, action) => {
    console.log('+++action', action);
  
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          // isUserLoggedIn: true
          user: action.payload
        };
        case 'LOGOUT_SUCCESS':
            return {
              ...state,
              // isUserLoggedIn: false
              user: null
            };
      default:
        return state;
    }
  };
  
  export default loginReducer;