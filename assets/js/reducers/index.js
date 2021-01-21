import { combineReducers } from 'redux';

import currentUser from './currentUserReducer';
import users from './usersReducer';
import postAd from './postAdReducer';
// import inventory from './inventory';
// import alert from './alert';

const rootReducer = combineReducers({
  currentUser,
  users,
  postAd
//   inventory,
//   postAd,
//   alert
});

export default rootReducer;