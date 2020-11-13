// Base Api
export const BASE_API = "https://fordevv2.gatbook.org/api/v1";
export const BASE_API_V1 = "https://fordev.gatbook.org/rest/api/";

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
export const GET_BOOK_DETAIL = editionId => `/book_edition/${editionId}`;
export const PUT_BOOK_LENDERS = "/book_edition/_find_sharing_users";
export const GET_BOOK_SUGGESTION = "/suggestion/book_suggestion";

export const GET_SELF_REVIEW = editionId => `/articles/self/review/${editionId}`;
export const GET_ARTICLES = "/articles";

export const GET_USER_TOP_WRITER = "/user/articles/top_writer";
