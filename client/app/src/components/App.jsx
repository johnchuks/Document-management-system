import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import 'babel-polyfill';
import DashboardPage from './users/DashboardPage.jsx';
import SignupPage from './users/SignupPage.jsx';
import LoginPage from './users/LoginPage.jsx';
import store from '../store/store';
import '../sass/style.scss';
import Authorization from '../../utils/authorization';
import { setLoginUser, createUserAction } from '../actions/userActions';
import ViewUserDocuments from './documents/ViewUserDocuments.jsx';
import EditProfile from './users/EditProfile.jsx';
import SearchDocuments from './documents/SearchDocuments.jsx';
import '../../../../node_modules/toastr/toastr.scss';
import ViewAllUsers from './users/ViewAllUsers.jsx';
import SearchUsers from './users/SearchUsers.jsx';

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
  <Route path="/signup" component={SignupPage} />
  <Route exact path="/" component={LoginPage} />

  <Route exact path="/dashboard" component={DashboardPage}/>
  <Route path="/documents" component={ViewUserDocuments} />
  <Route path="/profile" component={EditProfile} />
  <Route path="/searchdocument" component={SearchDocuments} />
  <Route path="/viewusers" component={ViewAllUsers} />
  <Route path="/searchuser" component={SearchUsers} />

  </Switch>
</Router>
</Provider>
, document.getElementById('app'));
