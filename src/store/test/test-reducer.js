const INITIAL_STATE = {
    isLoading: false,
    data: null,
    error: null,
  };
  
  const testReducer = (state = INITIAL_STATE, action) => {

  
    switch (action.type) {
      case 'TEST_START':
        return {
          ...state,
          isLoading: true,
        };
      case 'TEST_SUCCESS':
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case 'TEST_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default testReducer;