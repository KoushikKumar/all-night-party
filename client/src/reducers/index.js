import { combineReducers } from 'redux';
import restaurantsReducer from './restaurants_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  restaurantsData: restaurantsReducer,
  auth:authReducer
});

export default rootReducer;
