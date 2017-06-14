import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import userCreateReducer from '../reducers/userReducer';


const reducer = combineReducers({
  userCreateReducer
});
const store = createStore(reducer, applyMiddleware(thunk, promise));

export default store;

// store.dispatch({type:"CHANGE_NAME", payload:"jb"});
// store.dispatch({type: "CHANGE_EMAIL", payload:"27"});
