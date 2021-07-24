import { combineReducers } from 'redux';
import signinReducer from './signin';
import registrationListReducer from './registrationList';
import sessionReducer from './session';
import tokenReducer from './token';

/**
 * Redux Store
 */

// list the reducers list
export default combineReducers({
    signin: signinReducer,
    registrationList: registrationListReducer,
    session: sessionReducer,
    token: tokenReducer,
});
