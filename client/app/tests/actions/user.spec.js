import { expect } from 'chai';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import {
  setAuthUser,
  loginAction,
  signupAction,
  fetchUser,
  fetchUserAction,
  deleteUser,
  deleteUserAction,
  editProfile,
  editProfileAction,
  searchUser
} from '../../src/actions/userActions';
import Authorization from '../../utils/authorization';
import * as types from '../../src/constants/actionTypes';

describe('UserActions', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  const mock = new MockAdapter(axios);
  describe('dispatch Authenticated User', () => {
    it('Should set a new authenticated user', () => {
      const store = mockStore({});
      const user = {
        fullName: 'john',
        userName: 'john12',
        email: 'john@test.com',
        password: 'johnjames'
      };
      const expectAuthAction = [
        {
          type: types.SET_AUTH_USERS,
          user
        }
      ];
      const authAction = setAuthUser(user);
      store.dispatch(
        setAuthUser({
          fullName: 'john',
          userName: 'john12',
          email: 'john@test.com',
          password: 'johnjames'
        })
      );
      expect(store.getActions()).to.deep.equal(expectAuthAction);
    });
  });

  describe('dispatch logged in user', () => {
    beforeEach(() => {
      mock.reset();
    });

    it('Should create an AJAX CALL and login in the user successfully', (done) => {
      const userData = {
        email: 'john@test.com',
        fullName: 'john james',
        id: 3,
        roleId: 2
      };
      const expected = {
        type: types.SET_AUTH_USERS,
        user: {
          email: 'john@test.com',
          fullName: 'john james',
          id: 3,
          roleId: 2
        }
      };
      const store = mockStore();
      store.dispatch(loginAction(userData)).then((userData) => {
        expect(store.getActions()).to.deep.equal(expected);
        expect(store.getActions().type).to.deep.equal(expected.type);
      });
      done();
    });
  });
  describe('Signup Users', () => {
    it('Should create an AJAX CALL and signup new users', (done) => {
      const userData = {
        email: 'john@test.com',
        fullName: 'john james',
        id: 3,
        roleId: 2
      };
      const expected = {
        type: types.SET_AUTH_USERS,
        user: {
          email: 'john@test.com',
          fullName: 'john james',
          id: 3,
          roleId: 2
        }
      };
      const store = mockStore();
      store.dispatch(signupAction(userData)).then(() => {
        expect(store.getActions()).to.deep.equal(expected);
        expect(store.getActions().type).to.deep.equal(expected.type);
      });
      done();
    });
  });
  describe('Fetch users', () => {
    it('Should create an AJAX CALL and fetch users', () => {
      const users = [
        { email: 'john@test.com', fullName: 'john james', id: 3, roleId: 2 },
        { email: 'test@test.com', fullName: 'john test', id: 4, roleId: 2 }
      ];
      const expected = { type: types.FETCH_USERS, user: users };
      const store = mockStore({}, expected);
      store.dispatch(fetchUser(users)).then(() => {
        expect(store.getActions()).to.deep.equal(expected);
        expect(store.getActions().type).to.deep.equal(expected.type);
        expect(store.getActions().user).to.deep.equal(expected.user);
      });
    });
    it('Should dispatch the fetch users payload', (done) => {
      const store = mockStore({});
      const users = [
        { email: 'john@test.com', fullName: 'john james', id: 3, roleId: 2 },
        { email: 'test@test.com', fullName: 'john test', id: 4, roleId: 2 }
      ];
      const expected = [{ type: types.FETCH_USERS, users }];
      store.dispatch(fetchUserAction(users));
      expect(store.getActions()).to.deep.equal(expected);
      done();
    });
  });
  describe('Delete Users', () => {
    it('Should create an ajax request to delete users', (done) => {
      const userId = 4;
      const store = mockStore({});
      const expected = [{ type: types.DELETE_USER, payload: userId }];
      store.dispatch(deleteUser(userId)).then(() => {
        expect(store.getActions()).to.deep.equal(expected);
      });
      done();
    });
    it('Should dispatch the delete user action', () => {
      const userId = 4;
      const store = mockStore({});
      const expected = [{ type: types.DELETE_USER, payload: userId }];
      store.dispatch(deleteUserAction(userId));
      expect(store.getActions()).to.deep.equal(expected);
    });
  });
  describe('Edit Profile', () => {
    it('Should make an AJAX call to update user', (done) => {
      const user = { email: 'john@test.com', fullName: 'john james', id: 3 };
      const store = mockStore({});
      const expected = [{ type: types.EDIT_PROFILE, user: user }];
      store.dispatch(editProfile(user)).then(() => {
        expect(store.getActions()).to.deep.equal(expected);
      });
      done();
    });
    it('Should dispatch the update user action', () => {
      const user = { email: 'john@test.com', fullName: 'john james', id: 3 };
      const store = mockStore({});
      const expected = [{ type: types.EDIT_PROFILE, user: user }];
      const profileUpdate = store.dispatch(editProfileAction(user));
      expect(store.getActions()).to.deep.equal(expected);
    });
  });
  describe('Search for users', () => {
    it('Should make an ajax call when searching for users', (done) => {
      const searchResult = {
        email: 'john@test.com',
        fullName: 'john james',
        id: 3
      };
      const store = mockStore({});
      const expected = { type: types.SEARCH_USERS, users: searchResult };
      store.dispatch(searchUser(searchResult)).then(() => {
        expect(store.getActions()).to.deep.equal(expected);
      });
      done();
    });
  });
});
