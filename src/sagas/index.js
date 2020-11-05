/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AuthTypes } from "../redux/auth.redux";
import { EditionTypes } from "redux/edition.redux";

/* ------------- Sagas ------------- */
import { requestLogin } from "./auth.saga";
import { requestGetLendersList, requestGetReviews, requestGetSelfReview } from "./edition.saga";

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // authentication
    takeLatest(AuthTypes.REQUEST_LOGIN, requestLogin),

    // edition
    takeLatest(EditionTypes.REQUEST_GET_LENDERS_LIST, requestGetLendersList),
    takeLatest(EditionTypes.REQUEST_GET_SELF_REVIEW, requestGetSelfReview),
    takeLatest(EditionTypes.REQUEST_GET_REVIEWS, requestGetReviews),
  ]);
}
