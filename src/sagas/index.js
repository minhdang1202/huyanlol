/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AuthTypes } from "../redux/auth.redux";
import { EditionTypes } from "redux/edition.redux";
import { ArticleTypes } from "redux/article.redux";
import { UserTypes } from "redux/user.redux";
import { ArticleCreateTypes } from "redux/articleCreate.redux";
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
  requestGetEditionSuggestion,
} from "./edition.saga";
import { requestGetTopWriter, requestGetUserProfile, requestImage } from "./user.saga";
import {
  requestGetGiversList,
  requestGetComments,
  requestGetRepliesList,
  requestGetHomeArticles,
  requestGetHomeReviews,
  requestGetChallengeArticles,
} from "./article.saga";
import {
  requestGetCategoriesList,
  requestGetHashTagsList,
  requestPostArticle,
  requestPatchArticle,
} from "./articleCreate.saga";

import {
  requestGetChallengeInfo,
  requestGetLeaderBoard,
  requestGetFriendLeaderBoard,
  requestGetActivity,
  requestPutJoin,
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
    takeLatest(EditionTypes.REQUEST_GET_EDITION_SUGGESTION, requestGetEditionSuggestion),

    // article
    takeLatest(ArticleTypes.REQUEST_HOME_ARTICLES, requestGetHomeArticles),
    takeLatest(ArticleTypes.REQUEST_HOME_REVIEWS, requestGetHomeReviews),
    takeLatest(ArticleTypes.REQUEST_GET_GIVERS_LIST, requestGetGiversList),
    takeLatest(ArticleTypes.REQUEST_GET_COMMENTS, requestGetComments),
    takeLatest(ArticleTypes.REQUEST_GET_REPLIES_LIST, requestGetRepliesList),
    takeLatest(ArticleTypes.REQUEST_CHALLENGE_ARTICLES, requestGetChallengeArticles),

    // user
    takeLatest(UserTypes.REQUEST_TOP_WRITER, requestGetTopWriter),
    takeLatest(UserTypes.REQUEST_PROFILE, requestGetUserProfile),
    takeLatest(UserTypes.REQUEST_IMAGE, requestImage),

    //article-create
    takeLatest(ArticleCreateTypes.REQUEST_HASH_TAGS_LIST, requestGetHashTagsList),
    takeLatest(ArticleCreateTypes.REQUEST_CATEGORIES_LIST, requestGetCategoriesList),
    takeLatest(ArticleCreateTypes.REQUEST_POST_ARTICLE, requestPostArticle),
    takeLatest(ArticleCreateTypes.REQUEST_PATCH_ARTICLE, requestPatchArticle),

    // challenge detail
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_INFO, requestGetChallengeInfo),
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_LEADER_BOARD, requestGetLeaderBoard),
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_FRIEND_LEADER_BOARD, requestGetFriendLeaderBoard),
    takeLatest(ChallengeTypes.REQUEST_GET_CHALLENGE_ACTIVITY, requestGetActivity),
    takeLatest(ChallengeTypes.REQUEST_JOIN_CHALLENGE, requestPutJoin),
  ]);
}
