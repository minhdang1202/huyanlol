import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  createList: null,
  createListSuccess: null,
  createBreakLine: null,
  createBreakLineSuccess: null,
  startReviewBook: ["editionId", "bookName", "rate"],
  startReviewBookSuccess: null,
});

export const ArticleCreateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null,
  hasCreateList: false,
  hasCreateBreakLine: false,
  hasStartReviewBook: false,
  reviewInfo: null,
};

/* ------------- Reducers ------------- */
const createList = (state = INITIAL_STATE) => ({
  ...state,
  hasCreateList: true,
});

const createListSuccess = (state = INITIAL_STATE) => ({
  ...state,
  hasCreateList: false,
});

const createBreakLine = (state = INITIAL_STATE) => ({
  ...state,
  hasCreateBreakLine: true,
});

const createBreakLineSuccess = (state = INITIAL_STATE) => ({
  ...state,
  hasCreateBreakLine: false,
});

const startReviewBook = (state = INITIAL_STATE, action) => ({
  ...state,
  hasStartReviewBook: true,
  reviewInfo: { ...action },
});

const startReviewBookSuccess = (state = INITIAL_STATE) => ({
  ...state,
  hasStartReviewBook: false,
  reviewInfo: null,
});

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.CREATE_LIST]: createList,
  [Types.CREATE_LIST_SUCCESS]: createListSuccess,

  [Types.CREATE_BREAK_LINE]: createBreakLine,
  [Types.CREATE_BREAK_LINE_SUCCESS]: createBreakLineSuccess,

  [Types.START_REVIEW_BOOK]: startReviewBook,
  [Types.START_REVIEW_BOOK_SUCCESS]: startReviewBookSuccess,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
