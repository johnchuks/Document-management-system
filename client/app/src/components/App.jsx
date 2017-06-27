import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import 'babel-polyfill';
import DashboardPage from './users/DashboardPage.jsx';
import SignupPage from './users/SignupPage';
import LoginPage from './users/LoginPage';
import store from '../store/store';
import '../sass/style.scss';
import Authorization from '../../utils/authorization';
import { setLoginUser, createUserAction } from '../actions/userActions';
import ViewUserDocuments from './documents/ViewUserDocuments';
import EditProfile from './users/EditProfile';
import NavigationBar from './users/NavigationBar';
import SearchDocuments from './documents/SearchDocuments';
import '../../../../node_modules/toastr/toastr.scss';
import ViewAllUsers from './users/ViewAllUsers';

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
  <Route path="/searchdocument" component={SearchDocuments} />
  <Route path="/viewusers" component={ViewAllUsers} />
  </Switch>
</Router>
</Provider>
, document.getElementById('app'));
