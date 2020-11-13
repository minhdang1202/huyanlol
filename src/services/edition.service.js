import { ApiConstant } from "const";
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

export const getBookReviews = bodyReq => {
  return createApi().put(ApiConstant.PUT_BOOK_REVIEWS, bodyReq);
};

export const getBookSuggestion = bodyReq => {
  return createApi(defaultConfigV1).get(ApiConstant.GET_BOOK_SUGGESTION, bodyReq);
};
