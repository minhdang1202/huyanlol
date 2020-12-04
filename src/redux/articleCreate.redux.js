import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestHashTagsList: ["data"],
  requestCategoriesList: ["data"],
  requestPostArticle: ["data"],
  requestPatchArticle: ["data"],

  editArticle: ["data"],
  postArticleSuccess: null,
  saveArticleSuccess: null,
  createList: null,
  createBreakLine: null,
  insertImage: null,
  startReviewBook: ["data"],
  finishReviewBook: null,

  articleCreateSuccess: ["data"],
  articleCreateFailure: ["data"],
});

export const ArticleCreateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null,
  isSaveSuccess: false,
  isSaveFailure: false,
  isPostSuccess: false,
  isPostFailure: false,
  isFetching: false,
  isReviewType: false,
  hashTagsList: {},
  categoriesList: [],
  reviewInfo: {},
  article: {},

  screen_hasCreateList: false,
  screen_hasCreateBreakLine: false,
  screen_hasInsertImage: false,
};

/* ------------- Reducers ------------- */
export const request = (state = INITIAL_STATE) => ({
  ...state,
  error: null,
  isFetching: true,
});

export const editArticle = (state = INITIAL_STATE, action) => ({
  ...state,
  article: action.data,
});

export const saveArticleSuccess = (state = INITIAL_STATE) => ({
  ...state,
  isSaveSuccess: false,
  isSaveFailure: false,
  isPostSuccess: false,
  isPostFailure: false,
});

export const postArticleSuccess = (state = INITIAL_STATE) => ({
  ...state,
  article: {},
});

export const createList = (state = INITIAL_STATE) => ({
  ...state,
  screen_hasCreateList: true,
});

export const createBreakLine = (state = INITIAL_STATE) => ({
  ...state,
  screen_hasCreateBreakLine: true,
});

export const insertImage = (state = INITIAL_STATE) => ({
  ...state,
  screen_hasInsertImage: true,
});

export const startReviewBook = (state = INITIAL_STATE, action) => ({
  ...state,
  isReviewType: true,
  reviewInfo: { ...action.data },
});

export const finishReviewBook = (state = INITIAL_STATE) => ({
  ...state,
  isReviewType: false,
  reviewInfo: {},
});

export const finish = (state = INITIAL_STATE, action) => {
  let data = action.data ? action.data : {};
  return {
    ...state,
    isFetching: false,
    screen_hasCreateList: false,
    screen_hasCreateBreakLine: false,
    screen_hasInsertImage: false,
    error: null,
    ...data,
  };
};

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.REQUEST_HASH_TAGS_LIST]: request,
  [Types.REQUEST_CATEGORIES_LIST]: request,
  [Types.REQUEST_POST_ARTICLE]: request,
  [Types.REQUEST_PATCH_ARTICLE]: request,

  [Types.EDIT_ARTICLE]: editArticle,
  [Types.SAVE_ARTICLE_SUCCESS]: saveArticleSuccess,
  [Types.POST_ARTICLE_SUCCESS]: postArticleSuccess,
  [Types.CREATE_LIST]: createList,
  [Types.CREATE_BREAK_LINE]: createBreakLine,
  [Types.INSERT_IMAGE]: insertImage,
  [Types.START_REVIEW_BOOK]: startReviewBook,
  [Types.FINISH_REVIEW_BOOK]: finishReviewBook,

  [Types.ARTICLE_CREATE_SUCCESS]: finish,
  [Types.ARTICLE_CREATE_FAILURE]: finish,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
