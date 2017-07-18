import { expect } from 'chai';
import usersReducer from '../../src/reducers/userReducer';
import { fetchUserSuccess, searchUserSuccess, getUserSuccess,
editProfileSuccess, setAuthUser } from '../../src/actions/userActions';

describe('User Reducer', () => {
  describe('Sign up user', () => {
    it('should create a user when passed SET_AUTH_USER', () => {
      const initialState = {
        isAuthenticated: false,
        user: {}
      };
    const newUser = { id: 2, fullName: 'johnbosco ohia', userName: 'jbl12', email: 'john@gmail.com'};

    const action = setAuthUser({user:newUser});
    const newState = usersReducer(initialState, action);
    expect(newState.user.user).to.equal(newUser);
    expect(newState.user.user.fullName).to.equal('johnbosco ohia');
    expect(newState.isAuthenticated).to.equal(true);
    })
  })
  describe('login in a user', () => {
    it('should login a user when passed SET_AUTH_USER', () => {
      const initialState = {
        isAuthenticated: false,
        user: {}
      };
    const newUser = { id: 2, fullName: 'johnbosco', userName: 'jbl12', email: 'jb@gmail.com'};

    const action = setAuthUser({user:newUser});
    const newState = usersReducer(initialState, action);
    expect(newState.user.user).to.equal(newUser);
    expect(newState.user.user.fullName).to.equal('johnbosco');
    expect(newState.isAuthenticated).to.equal(true);
    })
  })
  describe('get all users', () => {
    it('should get all users when passed FETCH_USERS',() => {
      const initialState = {
        users: []
      };
      const users = [{ id: 2, fullName: 'johnbosco', userName: 'jbl12', email: 'jb@gmail.com'}];

      const action = fetchUserSuccess({user: users, pagination: {}});
      const newState = usersReducer(initialState, action);
      expect(newState.users).to.be.a('array');
      expect(newState.users).to.have.length(1);
      expect(newState.users[0].fullName).to.equal('johnbosco');
    });
  });
  describe('update user', () => {
    it('should update a user when passed EDIT_PROFILE', () => {
      const initialState = {
        user:{ id: 2, fullName: 'johnbosco', userName: 'jbl12', email: 'jb@gmail.com'}

      };
      const updateUser = {id: 2, fullName: 'mayowa', userName: 'mayor'};
      const action = editProfileSuccess(updateUser);
      const newState = usersReducer(initialState, action);
      console.log(newState, '---->');
      expect(newState.user.fullName).to.equal('mayowa');
      expect(newState.user.userName).to.equal('mayor');
    });
  });
  describe('get a user', () => {
    it('should get a user when passed GET_USER', () => {
      const initialState = {
        user: {}
      };
      const getUser = { id: 2, fullName: 'johnbosco', userName: 'jbl12', email: 'jb@gmail.com'};
      const action = getUserSuccess(getUser);
      const newState = usersReducer(initialState, action);
      console.log(newState, '>>----');
      expect(newState.user.fullName).to.equal('johnbosco');
      expect(newState.user.email).to.equal('jb@gmail.com');
    });
  });
  describe('search for a user', () => {
    it('should search for a user when passed SEARCH_USER', () => {
      const initialState = {
        users: [],
      }
      const searchResult = {fullName: 'johnbosco'};
      const action = searchUserSuccess({ user: searchResult, pagination: {}});
      const newState = usersReducer(initialState, action);
      console.log(newState);
      expect(newState.users.fullName).to.equal('johnbosco');
    });
  });
});
