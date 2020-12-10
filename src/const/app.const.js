export const KEY_TOKEN = "gat_token";
export const KEY_STORED_APP = "gat_cookie";

export const APP_NAME = "GAT";

export const EXPIRES_TOKEN = 1;

export const BOOK_SUGGESTION = 10;

//Sort
export const SORT_ORDER = {
  asc: "ASC",
  desc: "DESC",
};

//Size to infinite scroll
export const DATA_SIZES = {
  books: 9,
  articles: 10,
  challenges: 6,
  hashTags: 10,
  categories: 10,
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
  unorderedList: "unordered-list-item",
};

export const THUMBNAIL_TYPE = 0;
export const COVER_TYPE = 1;
export const MAX_LENGTH_ARTICLE_TITLE = 250;
