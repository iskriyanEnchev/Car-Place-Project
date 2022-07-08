import {combineReducers} from 'redux';
import loginReducer from './login/login-reducer';

import testReducer from './test/test-reducer';

export default combineReducers({
  test: testReducer,
  user: loginReducer
});