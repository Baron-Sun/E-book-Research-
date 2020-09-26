import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthUser } from "./authUser";

// const AUTHED_ID = "taynan_cid";

export function handleInitialData() {
  return dispatch => {
    // dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      // dispatch(setAuthedUser(AUTHED_ID));
      // dispatch(hideLoading());
    });
  };
}
