import { saveLikeToggle, saveTweet } from "../utils/api";

export const RECEIVE_questions = "RECEIVE_questions";
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  };
}

export function handleAddTweet(tweet) {
  return (dispatch, getState) => {
    const { authUser } = getState();
    const { text, id } = tweet;

    dispatch();
    console.log(text);
    return saveTweet({
      text,
      author: authUser,
      replyingTo: id
    })
      .then(tweet => dispatch(addTweet(tweet)))
      .then(() => dispatch());
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_questions,
    questions
  };
}

function toggleTweet({ id, authUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authUser,
    hasLiked
  };
}

export function handleToggleTweet(info) {
  return dispatch => {
    saveLikeToggle(info)
      .then(() => {
        dispatch(toggleTweet(info));
      })
      .catch(e => {
        console.warn("Error in toggleTweet: ", e);
        alert("There was an error, please try again");
      });
  };
}
