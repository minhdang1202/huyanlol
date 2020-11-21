// Base Api
export const BASE_API = "https://fordevv2.gatbook.org/api/v1";
export const BASE_API_V1 = "https://fordev.gatbook.org/rest/api/";
export const BASE_URL = "https://fordevv2.gatbook.org/api/v1"; //testing
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

// * Book
export const GET_BOOK_DETAIL = editionId => `/book_edition/${editionId}`;
export const PUT_BOOK_LENDERS = "/book_edition/_find_sharing_users";
export const GET_BOOK_SUGGESTION = "/suggestion/book_suggestion";
export const GET_SELF_REVIEW = editionId => `/articles/self/review/${editionId}`;

// * Article
export const GET_ARTICLES = "/articles";
export const GET_USER_TOP_WRITER = "/user/articles/top_writer";
export const GET_BOOK_REVIEWS = "/articles";
export const GET_ARTICLE_DETAIL = articleId => `/articles/${articleId}`;
export const GET_ARTICLE_GIVERS = articleId => `/articles/${articleId}/reaction`;
export const GET_ARTICLE_COMMENTS = articleId => `/articles/${articleId}/comments`;
export const GET_ARTICLE_REPLIES = commentId => `/articles/comments/${commentId}/replies`;
export const GET_ARTICLE_COMMENT_GIVERS = commentId => `/articles/comments/${commentId}/reaction`;

// * Challenge
export const GET_CHALLENGE_INFO = challengeId => `/challenges/${challengeId}`;
export const GET_CHALLENGE_LEADER_BOARD = challengeId => `/challenges/${challengeId}/leader_board`;
export const GET_CHALLENGE_FRIEND_LEADER_BOARD = challengeId => `/challenges/${challengeId}/friend_leader_board`;
export const GET_CHALLENGE_ACTIVITY = challengeId => `/challenges/${challengeId}/activities`;
export const PUT_JOIN_CHALLENGE = challengeId => `/challenges/${challengeId}/_join`;
