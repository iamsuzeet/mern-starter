import { combineReducers } from 'redux';
import userReducer from './user/user-reducer';
import tourReducer from './tour/tour-reducers';

const rootReducer = combineReducers({
  user: userReducer,
  tours: tourReducer,
});

export default rootReducer;
