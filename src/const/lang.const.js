// Common language
export const ARR_LANGUAGE = [
  { lang: "Tiếng Việt", code: "vi" },
  { lang: "English", code: "en" },
];

// List language code
export const DEFAULT_LANG = "vi";

// Namespace corresponding with screen
export const NS_COMMON = "common";
export const NS_BOOK_DETAIL = "bookDetail";
export const NS_CHALLENGE_DETAIL = "challengeDetail";
export const NS_ARTICLE_DETAIL = "articleDetail";
export const NS_HOME = "home";
export const NS_ARTICLE_CREATE = "articleCreate";
export const NS_COLLECTION_BOOKS = "collectionBooks";
export const NS_CHALLENGE_LIST = "challengeList";
export const NS_COLLECTION_ARTICLES = "collectionArticles";
export const NS_INTRODUCTIONS = "introductions";
export const NS_ABOUT_US = "aboutUs";

export const getCommonKey = key => `${NS_COMMON}:${key}`;
