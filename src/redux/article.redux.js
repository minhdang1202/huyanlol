import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestHomeArticles: ["data"],
  requestHomeReviews: ["data"],

  articleFailure: ["data"],
  articleSuccess: ["data"],
});

export const ArticleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  error: null,

  homeArticles: {},
  homeReviews: {},
};

/* ------------- Reducers ------------- */
export const request = () => ({
  ...INITIAL_STATE,
  isFetching: true,
  error: null,
});

export const finish = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    error: null,
    isFetching: false,
    ...data,
  };
};

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.REQUEST_HOME_ARTICLES]: request,
  [Types.REQUEST_HOME_REVIEWS]: request,

  [Types.ARTICLE_SUCCESS]: finish,
  [Types.ARTICLE_FAILURE]: finish,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
