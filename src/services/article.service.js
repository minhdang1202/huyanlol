import { ApiConstant, AppConstant } from "const";
import { createApi } from "api";

export const getListArticles = data => {
  let params = getQueryPrams(data);
  return createApi().get(ApiConstant.GET_ARTICLES, params);
};

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
