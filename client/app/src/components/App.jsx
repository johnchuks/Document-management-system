import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import 'babel-polyfill';
import DashboardPage from './DashboardPage.jsx';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import store from '../store/store';
import '../sass/style.scss';

const history = createBrowserHistory();




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
