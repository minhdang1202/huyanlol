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

export const getCommonKey = key => `${NS_COMMON}:${key}`;
