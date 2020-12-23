import { ApiConstant, AppConstant } from "const";
import { createApi, defaultConfigV2 } from "api";

export const getListArticles = data => {
  let params = getQueryPrams(data);
  return createApi().get(ApiConstant.GET_ARTICLES, params);
};

export const getArticleDetail = (articleId, token) => {
  return createApi(defaultConfigV2, token).get(ApiConstant.GET_ARTICLE_DETAIL(articleId));
};

export const getChallengeListArticles = challengeId => {
  let params = getQueryPrams();
  return createApi().get(ApiConstant.GET_CHALLENGE_ARTICLES(challengeId), params);
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

export const postComment = (articleId, params) => {
  return createApi().post(ApiConstant.POST_COMMENT(articleId), params);
};

export const postReply = (commentId, params) => {
  return createApi().post(ApiConstant.POST_REPLY(commentId), params);
};

export const postReactArticle = (articleId, bodyReq) => {
  return createApi().post(ApiConstant.POST_REACT_ARTICLE(articleId), bodyReq);
};

export const postReactComment = commentId => {
  return createApi().post(ApiConstant.POST_REACT_COMMENT(commentId));
};

const getQueryPrams = data => {
  let defaultData = data || {};
  const { categoryIds, sorts, ...otherParams } = defaultData;
  let queryParams = {
    pageNum: 1,
    pageSize: AppConstant.DATA_SIZES.articles,
    ...otherParams,
  };
  if (sorts) queryParams.sorts = sorts.join(",");
  if (categoryIds) queryParams.categoryIds = categoryIds.join(",");

  return queryParams;
};
