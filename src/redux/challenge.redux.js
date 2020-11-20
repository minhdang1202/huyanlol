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
export const challengeRequest = () => ({
  ...INITIAL_STATE,
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

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.REQUEST_GET_CHALLENGE_INFO]: challengeRequest,
  [Types.GET_CHALLENGE_INFO_SUCCESS]: challengeSuccess,
  [Types.GET_CHALLENGE_INFO_FAILURE]: challengeFailure,

  [Types.REQUEST_GET_CHALLENGE_LEADER_BOARD]: challengeRequest,
  [Types.GET_CHALLENGE_LEADER_BOARD_SUCCESS]: challengeSuccess,
  [Types.GET_CHALLENGE_LEADER_BOARD_FAILURE]: challengeFailure,

  [Types.SET_CHALLENGE_DETAIL]: challengeDetailSet,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
