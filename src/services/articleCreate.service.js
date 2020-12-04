import { ApiConstant } from "const";
import { createApi } from "api";

export const getHashTagsList = params => {
  return createApi().get(ApiConstant.GET_HASHTAGS, params);
};

export const getCategoriesList = params => {
  return createApi().get(ApiConstant.GET_CATEGORIES, params);
};

export const postArticle = bodyReq => {
  return createApi().post(ApiConstant.POST_ARTICLE, bodyReq);
};

export const patchArticle = (articleId, bodyReq) => {
  return createApi().patch(ApiConstant.PATCH_ARTICLE(articleId), bodyReq);
};
