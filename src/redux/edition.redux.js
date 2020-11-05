import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestGetLendersList: ["data"],
  requestGetReviews: ["data"],
  requestGetSelfReview: ["data"],
  editionSuccess: ["data"],
  editionFailure: ["data"],
});

export const EditionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null,
};

/* ------------- Reducers ------------- */
export const success = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    error: null,
    ...data,
  };
};

export const failure = (state = INITIAL_STATE, action) => {
  const data = action.data ? action.data : {};
  return { ...state, ...data };
};

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.EDITION_SUCCESS]: success,
  [Types.EDITION_FAILURE]: failure,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
