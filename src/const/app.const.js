export const KEY_TOKEN = "gat_token";
export const KEY_STORED_APP = "gat_cookie";

export const APP_NAME = "GAT";

export const EXPIRES_TOKEN = 1;

export const BOOK_SUGGESTION = 10;
export const USER_SUGGESTION = 10;

//Sort
export const SORT_ORDER = {
  asc: "ASC",
  desc: "DESC",
};

export const SORT_COMMENT = {
  byPopular: 0,
  byFriend: 1,
};

//Size to infinite scroll
export const DATA_SIZES = {
  books: 9,
  articles: 10,
  challenges: 6,
  hashTags: 10,
  categories: 10,
  editions: 15,
  replies: 3,
  comments: 10,
  collectionArticles: 4,
};

// Base url
export const WEBSITE_URL = "http://gatbook.ddsolution.co";
export const BASE_IMAGE_URL = "https://fordev.gatbook.org/rest/api/common/get_image/{0}";

// App download url
export const GAT_GG_PLAY = "https://play.google.com/store/apps/details?id=com.gat";
export const GAT_APP_STORE = "https://apps.apple.com/vn/app/gat/id1230316898";

//OAuth AppId
export const APP_GOOGLE = "177876099439-9c4358ridetv491g2b0lokh8l0j0fmdd.apps.googleusercontent.com";
export const APP_FACEBOOK = "1937935059771206";

// Date format
export const FM_DD_MM_YYYY = "dd/MM/yyyy";
export const FM_DD_MM = "dd/MM";

// Article categories id
export const CATEGORY_REVIEW = 0;

// Article state
export const DRAFT = 0;
export const NOT_PUBLISHED = 1;
export const PUBLISHED = 2;

export const SNACKBAR_DURATION = 3000;
//challenge
export const CHALLENGE_TARGET_TYPE = {
  readBook: 1,
  writeArticle: 2,
  readBookList: 3,
  writeArticleList: 4,
};

export const CHALLENGE_TARGET_MODE = {
  fixedValue: 1,
  setByUser: 2,
};

export const CHALLENGE_PROGRESS_STATUS = {
  notComplete: 1,
  complete: 2,
};

export const CHALLENGE_MODE = {
  personal: 1,
  publicGroup: 2,
  privateGroup: 3,
};

export const CHALLENGE_ACTIVITY_TYPE = {
  join: 1,
  read: 2,
  share: 3,
  write: 4,
};

export const CHALLENGE_ACTIVITY_SIZE = 3;

export const CHALLENGE_DESCRIPTION_DEFAULT_LENGTH = 200;

export const CHALLENGE_LIST_TYPE = {
  all: 0,
  notJoined: 1,
  joined: 2,
};
export const DRAFT_TYPE = {
  divider: "DIVIDER",
  image: "IMAGE",
  link: "LINK",
  unstyled: "unstyled",
  atomic: "atomic",
  mention: "mention",
  mentionEdition: "&mention",
  unorderedList: "unordered-list-item",
};

export const VALUE_TYPE = {
  all: "ALL",
  title: "TITLE",
  name: "NAME",
};

export const THUMBNAIL_TYPE = 0;
export const COVER_TYPE = 1;

export const BOOK_SUGGESTION_CATEGORY = [
  { id: 1, titleKey: "TXT_LITERATURE_CATEGORY_TITLE" },
  { id: 2, titleKey: "TXT_CHILDREN_CATEGORY_TITLE" },
  { id: 3, titleKey: "TXT_SKILL_CATEGORY_TITLE" },
  { id: 4, titleKey: "TXT_MOM_AND_BABY_CATEGORY_TITLE" },
  { id: 5, titleKey: "TXT_ECONOMIC_CATEGORY_TITLE" },
  { id: 7, titleKey: "TXT_TEXTBOOK_CATEGORY_TITLE" },
  { id: 8, titleKey: "TXT_FOREIGN_LANGUAGE_CATEGORY_TITLE" },
  { id: 10, titleKey: "TXT_COMIC_CATEGORY_TITLE" },
  { id: 11, titleKey: "TXT_SYLLABUS_CATEGORY_TITLE" },
  { id: 12, titleKey: "TXT_SYNTHESIS_CATEGORY_TITLE" },
  { id: 13, titleKey: "TXT_HISTORY_AND_GEOGRAPHY_CATEGORY_TITLE" },
  { id: 14, titleKey: "TXT_SCIENCE_CATEGORY_TITLE" },
  { id: 15, titleKey: "TXT_ART_CATEGORY_TITLE" },
  { id: 16, titleKey: "TXT_RELIGION_CATEGORY_TITLE" },
  { id: 17, titleKey: "TXT_MAGAZINE_CATEGORY_TITLE" },
];
export const COMMENT_DEFAULT_LENGTH = 250;
export const AUTO_SAVE_WAIT_TIME = 30000;
export const TYPING_WAIT_TIME = 500;
export const MAX_LENGTH_ARTICLE_TITLE = 250;
export const ARTICLE_CATEGORY = {
  review: {
    id: 0,
    title: "Review",
  },
  discussion: {
    id: 1,
    title: "Discussion",
  },
  tipAndTrick: {
    id: 2,
    title: "Tip and Trick",
  },
};
export const ARTICLE_INTRO_LENGTH_DEFAULT = 1021;
export const USER_MAX_REACT_COUNT = 10;
