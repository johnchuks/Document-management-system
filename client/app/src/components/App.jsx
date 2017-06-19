import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import 'babel-polyfill';
import DashboardPage from './DashboardPage.jsx';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import store from '../store/store';
import '../sass/style.scss';
import Authorization from '../../utils/authorization';
import { setLoginUser, createUserAction } from '../actions/userActions';

const history = createBrowserHistory();


if (localStorage.jwtToken) {
  console.log('token', jwtDecode(localStorage.jwtToken));
  Authorization.setAuthToken(localStorage.jwtToken);
  store.dispatch(setLoginUser(jwtDecode(localStorage.jwtToken)));
  store.dispatch(createUserAction(jwtDecode(localStorage.jwtToken)));
}


ReactDOM.render(
<Provider store={store}>
<Router history={history}>
  <Switch>
  <Route path="/signup" component={SignupPage} />
  <Route exact path="/" component={LoginPage} />
  <Route exact path = "/dashboard" component={DashboardPage} />
  </Switch>
</Router>
</Provider>
, document.getElementById('app'));
