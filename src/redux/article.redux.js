import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestHomeArticles: ["data"],
  requestHomeReviews: ["data"],
  requestChallengeArticles: ["data"],
  requestGetGivers: ["data"],
  requestGetCommentGivers: ["data"],
  requestGetComments: ["data"],
  requestGetReplies: ["data"],
  requestPostComment: ["data"],
  requestPostReply: ["data"],
  requestArticlePopularList: ["data"],

  getArticle: ["data"],
  replyComment: ["data"],
  cancelReply: null,
  finishPostComment: null,

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
  isFetchingGivers: false,
  isPostingComment: false,
  error: null,
  article: {},
  articleGivers: [],
  commentGivers: [],
  comments: {},
  replies: [],
  homeArticles: {},
  homeReviews: {},
  challengeArticles: [],
  isTypingReply: false,
  replyInfo: {},
  isPostCommentFailure: false,
  isPostCommentSuccess: false,
  isPostReplySuccess: false,
  newComment: {},
  articlePopularList: [],
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

export const requestGetGivers = (state = INITIAL_STATE) => ({
  ...state,
  isFetchingGivers: true,
});

export const requestGetReplies = (state = INITIAL_STATE) => ({
  ...state,
  isFetchingReplies: true,
});

export const requestPostComment = (state = INITIAL_STATE) => ({
  ...state,
  isPostingComment: true,
});

export const getArticle = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    article: action.data,
  };
};

const replyComment = (state = INITIAL_STATE, action) => ({
  ...state,
  isTypingReply: true,
  replyInfo: action.data,
});

const cancelReply = (state = INITIAL_STATE) => ({
  ...state,
  isTypingReply: false,
  replyInfo: {},
});

const finishPostComment = (state = INITIAL_STATE) => ({
  ...state,
  isPostCommentFailure: false,
  isPostCommentSuccess: false,
  isPostReplySuccess: false,
  isTypingReply: false,
  replyInfo: {},
  newComment: {},
});

export const finish = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    error: null,
    isFetching: false,
    isFetchingComments: false,
    isFetchingReplies: false,
    isFetchingGivers: false,
    isPostingComment: false,
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
  [Types.REQUEST_GET_GIVERS]: requestGetGivers,
  [Types.REQUEST_GET_COMMENT_GIVERS]: requestGetGivers,
  [Types.REQUEST_GET_COMMENTS]: requestGetComments,
  [Types.REQUEST_GET_REPLIES]: requestGetReplies,
  [Types.REQUEST_POST_COMMENT]: requestPostComment,
  [Types.REQUEST_POST_REPLY]: requestPostComment,
  [Types.REQUEST_ARTICLE_POPULAR_LIST]: request,

  [Types.FINISH_POST_COMMENT]: finishPostComment,
  [Types.GET_ARTICLE]: getArticle,
  [Types.REPLY_COMMENT]: replyComment,
  [Types.CANCEL_REPLY]: cancelReply,

  [Types.ARTICLE_SUCCESS]: finish,
  [Types.ARTICLE_FAILURE]: finish,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
