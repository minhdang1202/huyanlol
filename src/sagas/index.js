/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AuthTypes } from "../redux/auth.redux";
import { EditionTypes } from "redux/edition.redux";
import { ArticleTypes } from "redux/article.redux";
import { UserTypes } from "redux/user.redux";
import { ChallengeTypes } from "redux/challenge.redux";

/* ------------- Sagas ------------- */
import { requestLogin, requestRegister } from "./auth.saga";
import {
  requestGetLendersList,
  requestGetReviews,
  requestGetSelfReview,
  requestGetTotalLenders,
  requestGetNearestLenders,
  requestGetBookSuggestion,
} from "./edition.saga";
import { requestGetTopWriter, requestGetUserProfile } from "./user.saga";

import {
  requestGetGiversList,
  requestGetCommentsList,
  requestGetRepliesList,
  requestGetHomeArticles,
  requestGetHomeReviews,
  requestGetChallengeArticles,
} from "./article.saga";

import {
  requestGetChallengeInfo,
  requestGetLeaderBoard,
  requestGetFriendLeaderBoard,
  requestGetActivity,
  requestGetChallengeList,
  requestGetChallengeJoinedList,
  requestGetChallengeRecommendList,
} from "./challenge.saga";
/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // authentication
    takeLatest(AuthTypes.REQUEST_LOGIN, requestLogin),
    takeLatest(AuthTypes.REQUEST_LOGIN_BY_SOCIAL, requestLogin),
    takeLatest(AuthTypes.REQUEST_REGISTER, requestRegister),

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
    takeLatest(ArticleTypes.REQUEST_GET_GIVERS_LIST, requestGetGiversList),
    takeLatest(ArticleTypes.REQUEST_GET_COMMENTS_LIST, requestGetCommentsList),
    takeLatest(ArticleTypes.REQUEST_GET_REPLIES_LIST, requestGetRepliesList),
    takeLatest(ArticleTypes.REQUEST_CHALLENGE_ARTICLES, requestGetChallengeArticles),

    // user
    takeLatest(UserTypes.REQUEST_TOP_WRITER, requestGetTopWriter),
    takeLatest(UserTypes.REQUEST_PROFILE, requestGetUserProfile),

    // challenge detail
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_INFO, requestGetChallengeInfo),
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_LEADER_BOARD, requestGetLeaderBoard),
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_FRIEND_LEADER_BOARD, requestGetFriendLeaderBoard),
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_ACTIVITY, requestGetActivity),
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_LIST, requestGetChallengeList),
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_LIST_JOINED, requestGetChallengeJoinedList),
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_LIST_RECOMMEND, requestGetChallengeRecommendList),
  ]);
}
