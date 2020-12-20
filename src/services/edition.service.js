import { ApiConstant, AppConstant } from "const";
import { createApi, defaultConfigV1 } from "api";

export const getBookDetail = editionId => {
  return createApi().get(ApiConstant.GET_BOOK_DETAIL(editionId));
};

export const getBookLenders = bodyReq => {
  return createApi().put(ApiConstant.PUT_BOOK_LENDERS, bodyReq);
};

export const getSelfReview = editionId => {
  return createApi().get(ApiConstant.GET_SELF_REVIEW(editionId));
};

export const getBookReviews = params => {
  return createApi().get(ApiConstant.GET_BOOK_REVIEWS, params);
};

export const getBookSuggestion = data => {
  return createApi(defaultConfigV1).get(ApiConstant.GET_BOOK_SUGGESTION, getBookSuggestionParams(data));
};

export const getBookSuggestionByCategory = data => {
  return createApi(defaultConfigV1).get(ApiConstant.GET_BOOK_SUGGESTION_BY_CATEGORY, getBookSuggestionParams(data));
};

export const getEditionSuggestion = params => {
  return createApi().get(ApiConstant.GET_EDITION_SUGGESTION, params);
};

export const postEditionRate = params => {
  return createApi(defaultConfigV1).post(ApiConstant.POST_EDITION_RATE, null, { params: params });
};

const getBookSuggestionParams = data => {
  let defaultData = data || {};
  const { pageNum, pageSize, ...otherParams } = defaultData;
  let queryParams = {
    page: pageNum ? pageNum : 1,
    per_page: pageSize ? pageSize : AppConstant.DATA_SIZES.editions,
    ...otherParams,
  };
  return queryParams;
};
