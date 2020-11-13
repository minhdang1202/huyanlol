import { ApiConstant } from "const";
import { createApi } from "api";

export const getArticleDetail = articleId => {
  return createApi().get(ApiConstant.GET_ARTICLE_DETAIL(articleId));
};

export const getArticleGivers = (articleId, params) => {
  return createApi().get(ApiConstant.GET_ARTICLE_GIVERS(articleId), params);
};

export const getArticleCommentGivers = (commentId, params) => {
  return createApi().get(ApiConstant.GET_ARTICLE_COMMENT_GIVERS(commentId), params);
};

export const getArticleComments = (articleId, params) => {
  return createApi().get(ApiConstant.GET_ARTICLE_COMMENTS(articleId), params);
};

export const getArticleReplies = (commentId, params) => {
  return createApi().get(ApiConstant.GET_ARTICLE_REPLIES(commentId), params);
};
