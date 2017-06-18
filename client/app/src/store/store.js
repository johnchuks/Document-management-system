import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { fetchUsers, signUpUsers, loginUsersReducer } from '../reducers/userReducer';


const reducer = combineReducers({
  fetchUsers,
  signUpUsers,
  loginUsersReducer
});
const store = createStore(
  reducer, composeWithDevTools(applyMiddleware(thunk, promise)));

export default store;
