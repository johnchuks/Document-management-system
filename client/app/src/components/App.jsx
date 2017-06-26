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
import ViewUserDocuments from './ViewUserDocuments';
import EditProfile from './EditProfile';
import NavigationBar from './NavigationBar';
import '../../../../node_modules/toastr/toastr.scss';

const history = createBrowserHistory();


if (localStorage.jwtToken) {
  Authorization.setAuthToken(localStorage.jwtToken);
  store.dispatch(setLoginUser(jwtDecode(localStorage.jwtToken)));
  store.dispatch(createUserAction(jwtDecode(localStorage.jwtToken)));
}


ReactDOM.render(
<Provider store={store}>
<Router history={history}>
  <Switch>
  {/*<Route exact path="/" component={LandingPage} />*/}
  <Route path="/signup" component={SignupPage} />
  <Route exact path="/login" component={LoginPage} />
  <Route exact path="/dashboard" component={DashboardPage} />
  <Route path="/documents" component={ViewUserDocuments} />
  <Route path="/profile" component={EditProfile} />
  <Route path="/navigation" component={NavigationBar} />
  </Switch>
</Router>
</Provider>
, document.getElementById('app'));
