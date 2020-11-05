// Base Api
export const BASE_API = "https://fordevv2.gatbook.org";
export const GET_IMG_API = "https://fordev.gatbook.org";

export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const HEADER_FORM = {
  "Content-Type": "multipart/form-data",
};

export const TIMEOUT = 15000;

//Fixed value

// HTTP Status
export const STT_OK = 200;
export const STT_UNAUTHORIZED = 401;
export const STT_FORBIDDEN = 403;
export const STT_INTERNAL_SERVER = 500;

// Api
export const POST_LOGIN = "/auth/cons/login";
export const GET_IMAGE_BY_ID = imageId => `/rest/api/common/get_image/${imageId}`;
export const GET_BOOK_DETAIL = editionId => `/api/v1/book_edition/${editionId}`;
export const PUT_BOOK_LENDERS = "/api/v1/book_edition/_find_sharing_users";
export const GET_SELF_REVIEW = editionId => `/api/v1/articles/self/review/${editionId}`;
export const PUT_BOOK_REVIEWS = "/api/v1/articles/_get_articles";
