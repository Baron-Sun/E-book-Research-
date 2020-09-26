import { RECEIVE_USERS, UPDATE_USERS } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case UPDATE_USERS:
      return {
        ...state,
        bookId: action.bookId
      };
    default:
      return state;
  }
}
