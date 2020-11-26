import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestHomeArticles: ["data"],
  requestHomeReviews: ["data"],

  requestChallengeArticles: ["data"],

  requestGetGiversList: ["id", "params", "isComment"],
  getGiversListSuccess: ["data"],
  getGiversListFailure: ["data"],

  requestGetCommentsList: ["articleId", "params"],
  getCommentsListSuccess: ["data"],
  getCommentsListFailure: ["data"],

  requestGetRepliesList: ["commentId", "params"],
  getRepliesListSuccess: ["data"],
  getRepliesListFailure: ["data"],

  onReplyComment: ["commentId", "userId", "name"],
  onCancelReply: null,

  requestArticleFailure: ["data"],
  requestArticleSuccess: ["data"],

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
  challengeArticles: [],
  isTypingReply: false,
  replyInfo: null,
};

/* ------------- Reducers ------------- */
export const request = () => ({
  ...INITIAL_STATE,
  isFetching: true,
  error: null,
});

const onReplyComment = (state = INITIAL_STATE, action) => ({
  ...state,
  isTypingReply: true,
  replyInfo: { ...action },
});

const onCancelReply = (state = INITIAL_STATE) => ({
  ...state,
  isTypingReply: false,
  replyInfo: null,
});

export const requestArticleSuccess = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, error: null, ...data };
};

export const requestArticleFailure = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return { ...state, ...data };
};

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

  [Types.REQUEST_CHALLENGE_ARTICLES]: request,

  [Types.GET_GIVERS_LIST_SUCCESS]: requestArticleSuccess,
  [Types.GET_GIVERS_LIST_FAILURE]: requestArticleFailure,

  [Types.GET_COMMENTS_LIST_SUCCESS]: requestArticleSuccess,
  [Types.GET_COMMENTS_LIST_FAILURE]: requestArticleFailure,

  [Types.GET_REPLIES_LIST_SUCCESS]: requestArticleSuccess,
  [Types.GET_REPLIES_LIST_FAILURE]: requestArticleFailure,

  [Types.ON_REPLY_COMMENT]: onReplyComment,
  [Types.ON_CANCEL_REPLY]: onCancelReply,

  [Types.ARTICLE_SUCCESS]: finish,
  [Types.ARTICLE_FAILURE]: finish,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
