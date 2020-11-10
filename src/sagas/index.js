/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AuthTypes } from "../redux/auth.redux";
import { EditionTypes } from "redux/edition.redux";

/* ------------- Sagas ------------- */
import { requestLogin, requestRegister } from "./auth.saga";
import {
  requestGetLendersList,
  requestGetReviews,
  requestGetSelfReview,
  requestGetTotalLenders,
  requestGetNearestLenders,
} from "./edition.saga";

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // authentication
    takeLatest(AuthTypes.REQUEST_LOGIN, requestLogin),
    takeLatest(AuthTypes.REQUEST_REGISTER, requestRegister),

    // edition
    takeLatest(EditionTypes.REQUEST_GET_LENDERS_LIST, requestGetLendersList),
    takeLatest(EditionTypes.REQUEST_GET_SELF_REVIEW, requestGetSelfReview),
    takeLatest(EditionTypes.REQUEST_GET_REVIEWS, requestGetReviews),
    takeLatest(EditionTypes.REQUEST_GET_TOTAL_LENDERS, requestGetTotalLenders),
    takeLatest(EditionTypes.REQUEST_GET_NEAREST_LENDERS, requestGetNearestLenders),
  ]);
}
