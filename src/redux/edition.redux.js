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

  requestGetBookSuggestion: ["data"],
  requestGetBookSuggestionByCategory: ["data"],
  requestGetEditionSuggestion: ["data"],

  requestPostEditionRate: ["data"],

  requestEditionFailure: ["data"],
  requestEditionSuccess: ["data"],
});

export const EditionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  error: null,

  suggestions: [],
  suggestionsByCategory: [],
};

/* ------------- Reducers ------------- */
export const request = (state = INITIAL_STATE) => ({
  ...state,
  isFetching: true,
  error: null,
});

export const requestEditionSuccess = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, error: null, isFetching: false, ...data };
};

export const requestEditionFailure = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, isFetching: false, ...data };
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

  [Types.REQUEST_GET_BOOK_SUGGESTION]: request,
  [Types.REQUEST_GET_BOOK_SUGGESTION_BY_CATEGORY]: request,
  [Types.REQUEST_GET_EDITION_SUGGESTION]: request,

  [Types.REQUEST_POST_EDITION_RATE]: request,

  [Types.REQUEST_EDITION_SUCCESS]: requestEditionSuccess,
  [Types.REQUEST_EDITION_FAILURE]: requestEditionFailure,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
