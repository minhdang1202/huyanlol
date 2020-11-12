import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestGetGiversList: ["data"],
  getGiversListSuccess: ["data"],
  getGiversListFailure: ["data"],

  requestGetCommentsList: ["data"],
  getCommentsListSuccess: ["data"],
  getCommentsListFailure: ["data"],

  requestArticleFailure: ["data"],
  requestArticleSuccess: ["data"],
});

export const ArticleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null,
};

/* ------------- Reducers ------------- */
export const requestArticleSuccess = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, error: null, ...data };
};

export const requestArticleFailure = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, ...data };
};

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.GET_GIVERS_LIST_SUCCESS]: requestArticleSuccess,
  [Types.GET_GIVERS_LIST_FAILURE]: requestArticleFailure,

  [Types.GET_COMMENTS_LIST_SUCCESS]: requestArticleSuccess,
  [Types.GET_COMMENTS_LIST_FAILURE]: requestArticleFailure,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
