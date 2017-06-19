import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { signUpUsers, loginUsersReducer } from '../reducers/userReducer';
import { fetchDocuments } from '../reducers/documentReducer';



const reducer = combineReducers({
  signUpUsers,
  loginUsersReducer,
  fetchDocuments
});
const store = createStore(
  reducer, composeWithDevTools(applyMiddleware(thunk, promise)));

export default store;
