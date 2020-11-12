/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AuthTypes } from "../redux/auth.redux";
import { EditionTypes } from "redux/edition.redux";
import { ArticleTypes } from "redux/article.redux";

/* ------------- Sagas ------------- */
import { requestLogin } from "./auth.saga";
import {
  requestGetLendersList,
  requestGetReviews,
  requestGetSelfReview,
  requestGetTotalLenders,
  requestGetNearestLenders,
  requestGetBookSuggestion,
} from "./edition.saga";
import { requestGetHomeArticles, requestGetHomeReviews } from "./article.saga";

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // authentication
    takeLatest(AuthTypes.REQUEST_LOGIN, requestLogin),

    // edition
    takeLatest(EditionTypes.REQUEST_GET_LENDERS_LIST, requestGetLendersList),
    takeLatest(EditionTypes.REQUEST_GET_SELF_REVIEW, requestGetSelfReview),
    takeLatest(EditionTypes.REQUEST_GET_REVIEWS, requestGetReviews),
    takeLatest(EditionTypes.REQUEST_GET_TOTAL_LENDERS, requestGetTotalLenders),
    takeLatest(EditionTypes.REQUEST_GET_NEAREST_LENDERS, requestGetNearestLenders),
    takeLatest(EditionTypes.REQUEST_GET_BOOK_SUGGESTION, requestGetBookSuggestion),

    // article
    takeLatest(ArticleTypes.REQUEST_HOME_ARTICLES, requestGetHomeArticles),
    takeLatest(ArticleTypes.REQUEST_HOME_REVIEWS, requestGetHomeReviews),
  ]);
}
