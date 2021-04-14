import { combineReducers } from 'redux';
import appReducer from '../features/appSlice';
import userReducer from '../features/userSlice';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer
})

export default rootReducer;