import { combineReducers } from 'redux';

import currentUser from './currentUserReducer';
import users from './usersReducer';
// import postAd from './postAd';
// import inventory from './inventory';
// import alert from './alert';

const rootReducer = combineReducers({
  currentUser,
  users
//   inventory,
//   postAd,
//   alert
});

export default rootReducer;