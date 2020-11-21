import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestGetChallengeInfo: ["data"],
  getChallengeInfoSuccess: ["data"],
  getChallengeInfoFailure: ["data"],
  setChallengeDetail: ["data"],

  requestGetChallengeLeaderBoard: ["data"],
  getChallengeLeaderBoardSuccess: ["data"],
  getChallengeLeaderBoardFailure: ["data"],

  requestGetChallengeActivity: ["data"],
  getChallengeActivitySuccess: ["data"],
  getChallengeActivityFailure: ["data"],

  requestGetChallengeFriendLeaderBoard: ["data"],
  getChallengeFriendLeaderBoardSuccess: ["data"],
  getChallengeFriendLeaderBoardFailure: ["data"],

  requestJoinChallenge: ["data"],
  joinChallengeSuccess: null,
});

export const ChallengeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  error: null,
  list: {},
  detail: {},
};

/* ------------- Reducers ------------- */
export const challengeRequest = (state = INITIAL_STATE) => ({
  ...state,
  isFetching: true,
});

export const challengeSuccess = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    isFetching: false,
    error: null,
    ...data,
  };
};

export const challengeFailure = (state = INITIAL_STATE, action) => {
  const data = action.data ? action.data : {};
  return { ...state, isFetching: false, ...data };
};

export const challengeDetailSet = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    isFetching: false,
    error: null,
    detail: data,
  };
};

export const challengeDetailActivitySuccess = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    isFetching: false,
    error: null,
    detail: { ...state.detail, activity: data },
  };
};

export const challengeDetailLeaderBoardSuccess = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    isFetching: false,
    error: null,
    detail: { ...state.detail, leaderBoard: data },
  };
};

export const challengeDetailFriendLeaderBoardSuccess = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    isFetching: false,
    error: null,
    detail: { ...state.detail, friendLeaderBoard: data },
  };
};

export const challengeJoinSuccess = () => ({
  ...INITIAL_STATE,
  isFetching: false,
});
/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.REQUEST_GET_CHALLENGE_INFO]: challengeRequest,
  [Types.GET_CHALLENGE_INFO_SUCCESS]: challengeSuccess,
  [Types.GET_CHALLENGE_INFO_FAILURE]: challengeFailure,

  [Types.REQUEST_GET_CHALLENGE_LEADER_BOARD]: challengeRequest,
  [Types.GET_CHALLENGE_LEADER_BOARD_SUCCESS]: challengeDetailLeaderBoardSuccess,
  [Types.GET_CHALLENGE_LEADER_BOARD_FAILURE]: challengeFailure,

  [Types.SET_CHALLENGE_DETAIL]: challengeDetailSet,

  [Types.REQUEST_GET_CHALLENGE_FRIEND_LEADER_BOARD]: challengeRequest,
  [Types.GET_CHALLENGE_FRIEND_LEADER_BOARD_SUCCESS]: challengeDetailFriendLeaderBoardSuccess,
  [Types.GET_CHALLENGE_FRIEND_LEADER_BOARD_FAILURE]: challengeFailure,

  [Types.REQUEST_GET_CHALLENGE_ACTIVITY]: challengeRequest,
  [Types.GET_CHALLENGE_ACTIVITY_SUCCESS]: challengeDetailActivitySuccess,
  [Types.GET_CHALLENGE_ACTIVITY_FAILURE]: challengeFailure,

  [Types.REQUEST_JOIN_CHALLENGE]: challengeRequest,
  [Types.JOIN_CHALLENGE_SUCCESS]: challengeJoinSuccess,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
