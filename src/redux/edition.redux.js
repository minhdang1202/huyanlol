import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestGetLendersList: null,
  getLendersListSuccess: ["data"],
  getLendersListFailure: ["data"],

  requestGetNearestLenders: null,
  getNearestLendersSuccess: ["data"],
  getNearestLendersFailure: ["data"],

  requestGetTotalLenders: null,
  getTotalLendersSuccess: ["data"],
  getTotalLendersFailure: ["data"],

  requestGetReviews: ["data"],
  getReviewsSuccess: ["data"],
  getReviewsFailure: ["data"],

  requestGetSelfReview: null,
  getSelfReviewSuccess: ["data"],
  getSelfReviewFailure: ["data"],

  requestEditionFailure: ["data"],
  requestEditionSuccess: ["data"],
});

export const EditionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null,
};

/* ------------- Reducers ------------- */
export const requestEditionSuccess = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, error: null, ...data };
};

export const requestEditionFailure = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, ...data };
};

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.GET_LENDERS_LIST_SUCCESS]: requestEditionSuccess,
  [Types.GET_LENDERS_LIST_FAILURE]: requestEditionFailure,

  [Types.GET_REVIEWS_SUCCESS]: requestEditionSuccess,
  [Types.GET_REVIEWS_FAILURE]: requestEditionFailure,

  [Types.GET_SELF_REVIEW_SUCCESS]: requestEditionSuccess,
  [Types.GET_SELF_REVIEW_FAILURE]: requestEditionFailure,

  [Types.GET_TOTAL_LENDERS_SUCCESS]: requestEditionSuccess,
  [Types.GET_TOTAL_LENDERS_FAILURE]: requestEditionFailure,

  [Types.GET_NEAREST_LENDERS_SUCCESS]: requestEditionSuccess,
  [Types.GET_NEAREST_LENDERS_FAILURE]: requestEditionFailure,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
