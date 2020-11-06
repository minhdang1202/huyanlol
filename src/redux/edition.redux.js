import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestGetLendersList: ["data"],
  getLendersListSuccess: ["data"],
  getLendersListFailure: ["data"],

  requestGetNearestLenders: ["data"],
  getNearestLendersSuccess: ["data"],
  getNearestLendersFailure: ["data"],

  requestGetTotalLenders: ["data"],
  getTotalLendersSuccess: ["data"],
  getTotalLendersFailure: ["data"],

  requestGetReviews: ["data"],
  getReviewsSuccess: ["data"],
  getReviewsFailure: ["data"],

  requestGetSelfReview: ["data"],
  getSelfReviewSuccess: ["data"],
  getSelfReviewFailure: ["data"],

  requestFailure: ["data"],
  requestSuccess: ["data"],
});

export const EditionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null,
};

/* ------------- Reducers ------------- */
export const requestSuccess = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, error: null, ...data };
};

export const requestFailure = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, ...data };
};

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.GET_LENDERS_LIST_SUCCESS]: requestSuccess,
  [Types.GET_LENDERS_LIST_FAILURE]: requestFailure,

  [Types.GET_REVIEWS_SUCCESS]: requestSuccess,
  [Types.GET_REVIEWS_FAILURE]: requestFailure,

  [Types.GET_SELF_REVIEW_SUCCESS]: requestSuccess,
  [Types.GET_SELF_REVIEW_FAILURE]: requestFailure,

  [Types.GET_TOTAL_LENDERS_SUCCESS]: requestSuccess,
  [Types.GET_TOTAL_LENDERS_FAILURE]: requestFailure,

  [Types.GET_NEAREST_LENDERS_SUCCESS]: requestSuccess,
  [Types.GET_NEAREST_LENDERS_FAILURE]: requestFailure,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
