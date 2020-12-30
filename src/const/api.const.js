// Base Api
export const BASE_API = "https://productionv2.gatbook.org/api/v1";
export const BASE_API_V1 = "https://production.gatbook.org/rest/api";
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
export const STT_NOT_FOUND = 404;
export const STT_INTERNAL_SERVER = 500;

// Api
// * User
export const POST_LOGIN = "/user/login_by_email";
export const POST_LOGIN_BY_SOCIAL = "/user/login_by_social";
export const POST_REGISTER = "/user/register_by_email";
export const GET_USER_PROFILE = "/user/self/info";
export const GET_USER_TOP_WRITER = "/user/articles/top_writer";
export const POST_USER_IMAGES = "/user-images";
export const GET_USER_SUGGESTION = "/user/suggestion";
export const POST_FOLLOW_USER = "/users/self/follows";
export const DELETE_UN_FOLLOW_USER = targetUserID => `/users/self/follows/${targetUserID}`;

// * Book
export const GET_BOOK_DETAIL = editionId => `/book_edition/${editionId}`;
export const PUT_BOOK_LENDERS = "/book_edition/_find_sharing_users";
export const GET_BOOK_SUGGESTION = "/suggestion/book_suggestion";
export const GET_BOOK_SUGGESTION_BY_CATEGORY = "/suggestion/book_suggestion_by_category";
export const GET_SELF_REVIEW = editionId => `/articles/self/review/${editionId}`;
export const GET_EDITION_SUGGESTION = "/book_edition/suggestion";
export const POST_EDITION_RATE = "/book/selfupdate_book_evaluation";

// * Article
export const GET_ARTICLES = "/articles";
export const GET_BOOK_REVIEWS = "/articles";
export const GET_ARTICLE_DETAIL = articleId => `/articles/${articleId}`;
export const GET_ARTICLE_GIVERS = articleId => `/articles/${articleId}/reaction`;
export const GET_ARTICLE_COMMENTS = articleId => `/articles/${articleId}/comments`;
export const GET_ARTICLE_REPLIES = commentId => `/articles/comments/${commentId}/replies`;
export const GET_ARTICLE_COMMENT_GIVERS = commentId => `/articles/comments/${commentId}/reaction`;
export const POST_COMMENT = articleId => `/articles/${articleId}/comments`;
export const POST_REPLY = commentId => `/articles/comments/${commentId}/replies`;
export const POST_REACT_ARTICLE = articleId => `/articles/${articleId}/reaction`;
export const POST_REACT_COMMENT = commentId => `/articles/comments/${commentId}/reaction`;
export const POST_BOOKMARK_ARTICLE = articleId => `/articles/${articleId}/bookmarks`;

//Article-create
export const GET_HASHTAGS = "/hashtags";
export const GET_CATEGORIES = "/articles/categories";
export const PUT_SEARCH_EDITIONS = "/book_edition/search";
export const POST_ARTICLE = "/articles";
export const PATCH_ARTICLE = articleId => `/articles/${articleId}`;
export const GET_CHALLENGE_ARTICLES = challengeId => `/articles/challenge/${challengeId}`;

// * Challenge
export const GET_CHALLENGE_INFO = challengeId => `/challenges/${challengeId}`;
export const GET_CHALLENGE_LEADER_BOARD = challengeId => `/challenges/${challengeId}/leader_board`;
export const GET_CHALLENGE_FRIEND_LEADER_BOARD = challengeId => `/challenges/${challengeId}/friend_leader_board`;
export const GET_CHALLENGE_ACTIVITY = challengeId => `/challenges/${challengeId}/activities`;
export const PUT_JOIN_CHALLENGE = challengeId => `/challenges/${challengeId}/_join`;
export const GET_CHALLENGE_LIST_ALL = "/challenges";
