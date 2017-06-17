
 const signUpUsers = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_USERS': {
      return Object.assign(...state, { user: action.payload });
    }
    default:
      return state;
  }
};
const fetchUsers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS': {
      return Object.assign(...state, { users: action.payload, error: null });
    }
    default:
      return state;
  }
};
export { fetchUsers, signUpUsers };
