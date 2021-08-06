import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestTopWriter: ["data"],
  requestProfile: ["data"],
  requestImage: ["data"],
  requestImageDone: null,
  requestUserSuggestion: ["data"],
  requestProfileVisitor: ["data"],

  userFailure: ["data"],
  userSuccess: ["data"],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  error: null,
  imageId: null,
  topWriter: {},
  profile: {},
  suggestions: [],
  profileVisitor: {},
};

/* ------------- Reducers ------------- */
export const request = (state = INITIAL_STATE) => ({
  ...state,
  isFetching: true,
  error: null,
});

export const finish = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    error: null,
    imageId: null,
    isFetching: false,
    ...data,
  };
};

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.REQUEST_TOP_WRITER]: request,
  [Types.REQUEST_PROFILE]: request,
  [Types.REQUEST_IMAGE]: request,
  [Types.REQUEST_USER_SUGGESTION]: request,
  [Types.REQUEST_IMAGE_DONE]: finish,
  [Types.REQUEST_PROFILE_VISITOR]: request,
  [Types.USER_SUCCESS]: finish,
  [Types.USER_FAILURE]: finish,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
