import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestGetGiversList: ["articleId", "params"],
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
});

export const ArticleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null,
  isTypingReply: false,
  replyInfo: null,
};

/* ------------- Reducers ------------- */
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

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.GET_GIVERS_LIST_SUCCESS]: requestArticleSuccess,
  [Types.GET_GIVERS_LIST_FAILURE]: requestArticleFailure,

  [Types.GET_COMMENTS_LIST_SUCCESS]: requestArticleSuccess,
  [Types.GET_COMMENTS_LIST_FAILURE]: requestArticleFailure,

  [Types.GET_REPLIES_LIST_SUCCESS]: requestArticleSuccess,
  [Types.GET_REPLIES_LIST_FAILURE]: requestArticleFailure,

  [Types.ON_REPLY_COMMENT]: onReplyComment,
  [Types.ON_CANCEL_REPLY]: onCancelReply,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
