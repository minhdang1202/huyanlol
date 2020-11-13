import { ApiConstant } from "const";
import { createApi } from "api";

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
