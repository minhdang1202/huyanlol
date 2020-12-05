import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestHomeArticles: ["data"],
  requestHomeReviews: ["data"],
  requestChallengeArticles: ["data"],
  requestGetGiversList: ["id", "params", "isComment"],
  requestGetComments: ["data"],
  requestGetReplies: ["data"],

  getArticle: ["data"],
  onReplyComment: ["commentId", "userId", "name"],
  onCancelReply: null,

  articleFailure: ["data"],
  articleSuccess: ["data"],
});

export const ArticleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  isFetchingComments: false,
  isFetchingReplies: false,
  error: null,
  article: {},
  comments: {},
  replies: [],
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

export const requestGetComments = (state = INITIAL_STATE) => ({
  ...state,
  isFetchingComments: true,
});

export const requestGetReplies = (state = INITIAL_STATE) => ({
  ...state,
  isFetchingReplies: true,
});

export const getArticle = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    article: action.data,
  };
};

const onReplyComment = (state = INITIAL_STATE, action) => ({
  ...state,
  isTypingReply: true,
  replyInfo: action,
});

const onCancelReply = (state = INITIAL_STATE) => ({
  ...state,
  isTypingReply: false,
  replyInfo: null,
});

export const finish = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  console.log(data);
  return {
    ...state,
    error: null,
    isFetching: false,
    isFetchingComments: false,
    isFetchingReplies: false,
    isTypingReply: false,
    replyInfo: null,
    ...data,
  };
};

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.REQUEST_HOME_ARTICLES]: request,
  [Types.REQUEST_HOME_REVIEWS]: request,
  [Types.REQUEST_CHALLENGE_ARTICLES]: request,
  [Types.REQUEST_GET_COMMENTS]: requestGetComments,
  [Types.REQUEST_GET_REPLIES]: requestGetReplies,

  [Types.GET_ARTICLE]: getArticle,
  [Types.ON_REPLY_COMMENT]: onReplyComment,
  [Types.ON_CANCEL_REPLY]: onCancelReply,

  [Types.ARTICLE_SUCCESS]: finish,
  [Types.ARTICLE_FAILURE]: finish,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
