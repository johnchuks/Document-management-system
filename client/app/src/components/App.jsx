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
import { setLoginUser } from '../actions/userActions';

const history = createBrowserHistory();


if (localStorage.userToken) {
  Authorization.setAuthToken(localStorage.userToken);
  store.dispatch(setLoginUser(jwtDecode(localStorage.userToken)));
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
