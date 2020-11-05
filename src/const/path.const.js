export const ROOT = "/";
export const LOGIN = "/login";
export const NOT_FOUND = "/not-found";
export const BOOK_DETAIL = (editionTitleNoMark, editionId) => `/editions/${editionTitleNoMark}-b${editionId}`;

export const ARTICLE_DETAIL_ID = articleId => `/articles/${articleId}`;
