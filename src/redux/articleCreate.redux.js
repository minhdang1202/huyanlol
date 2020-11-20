import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  createList: null,
  createListSuccess: null,
  createBreakLine: null,
  createBreakLineSuccess: null,
});

export const ArticleCreateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null,
  hasCreateList: false,
  hasCreateBreakLine: false,
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

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.CREATE_LIST]: createList,
  [Types.CREATE_LIST_SUCCESS]: createListSuccess,

  [Types.CREATE_BREAK_LINE]: createBreakLine,
  [Types.CREATE_BREAK_LINE_SUCCESS]: createBreakLineSuccess,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
