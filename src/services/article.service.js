import { ApiConstant } from "const";
import { createApi } from "api";

export const getArticleDetail = articleId => {
  return createApi().get(ApiConstant.GET_ARTICLE_DETAIL(articleId));
};
