export const testStart = () => ({
    type: 'TEST_START',
  });
  
  export const testSuccess = payload => ({
    type: 'TEST_SUCCESS',
    payload,
  });
  
  export const testFailure = error => ({
    type: 'TEST_FAILURE',
    payload: error,
  });