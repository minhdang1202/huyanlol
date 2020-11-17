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
};

/* ------------- Reducers ------------- */
export const request = () => ({
  ...INITIAL_STATE,
  isFetching: true,
});

export const success = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    isFetching: false,
    error: null,
    ...data,
  };
};

export const failure = (state = INITIAL_STATE, action) => {
  const data = action.data ? action.data : {};
  return { ...state, isFetching: false, ...data };
};

export const set = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    isFetching: false,
    error: null,
    ...data,
  };
};

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.REQUEST_GET_CHALLENGE_INFO]: request,
  [Types.GET_CHALLENGE_INFO_SUCCESS]: success,
  [Types.GET_CHALLENGE_INFO_FAILURE]: failure,

  [Types.REQUEST_GET_CHALLENGE_LEADER_BOARD]: request,
  [Types.GET_CHALLENGE_LEADER_BOARD_SUCCESS]: success,
  [Types.GET_CHALLENGE_LEADER_BOARD_FAILURE]: failure,
  [Types.SET_CHALLENGE_DETAIL]: set,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
