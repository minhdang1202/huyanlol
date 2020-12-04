import { call, put, select } from "redux-saga/effects";
import { ApiConstant, AppConstant } from "const";
import ArticleCreateAction from "redux/articleCreate.redux";
import { ArticleCreateService, EditionService } from "services";
import { getRateParams } from "./edition.saga";

export function* requestGetHashTagsList(action) {
  let response = yield call(ArticleCreateService.getHashTagsList, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(
        ArticleCreateAction.articleCreateSuccess({
          hashTagsList: responseData,
        }),
      );
    } else {
      yield put(ArticleCreateAction.articleCreateFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleCreateAction.articleCreateFailure(error));
  }
}

export function* requestGetCategoriesList(action) {
  let response = yield call(ArticleCreateService.getCategoriesList, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(
        ArticleCreateAction.articleCreateSuccess({
          categoriesList: responseData.pageData,
        }),
      );
    } else {
      yield put(ArticleCreateAction.articleCreateFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleCreateAction.articleCreateFailure(error));
  }
}

export function* requestPostArticle(action) {
  const { value, ...otherParams } = action.data;
  let [isReviewType, reviewInfo] = yield select(({ articleCreateRedux }) => [
    articleCreateRedux.isReviewType,
    articleCreateRedux.reviewInfo,
  ]);
  let responseRate = { status: ApiConstant.STT_OK };

  let response = yield call(ArticleCreateService.postArticle, otherParams);
  if (isReviewType)
    responseRate = yield call(
      EditionService.postEditionRate,
      getRateParams({ editionId: reviewInfo.editionId, value }),
    );

  try {
    if (response.status === ApiConstant.STT_OK && responseRate.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(
        ArticleCreateAction.articleCreateSuccess({
          article: responseData,
          isSaveSuccess: true,
        }),
      );
    } else {
      yield put(ArticleCreateAction.articleCreateFailure({ isSaveFailure: true }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleCreateAction.articleCreateFailure({ error, isSaveFailure: true }));
  }
}

export function* requestPatchArticle(action) {
  const { articleId, bodyReq } = action.data;
  const { value, ...otherParams } = bodyReq;
  const editionId = otherParams.editionIds[0];
  const state = bodyReq.state;
  const isSaveSuccess = !Boolean(state);
  const isSaveFailure = !Boolean(state);
  const isPostSuccess = Boolean(state);
  const isPostFailure = Boolean(state);

  let responseRate = { status: ApiConstant.STT_OK };

  if (articleId) {
    let response = yield call(ArticleCreateService.patchArticle, articleId, otherParams);
    if (bodyReq.categoryIds.length && bodyReq.categoryIds[0] === AppConstant.CATEGORY_REVIEW)
      responseRate = yield call(EditionService.postEditionRate, getRateParams({ editionId, value }));

    try {
      if (response.status === ApiConstant.STT_OK && responseRate.status === ApiConstant.STT_OK) {
        yield put(
          ArticleCreateAction.articleCreateSuccess({
            isPostSuccess,
            isSaveSuccess,
          }),
        );
      } else {
        yield put(ArticleCreateAction.articleCreateFailure({ isSaveFailure, isPostFailure }));
      }
    } catch (error) {
      console.log(error);
      yield put(
        ArticleCreateAction.articleCreateFailure({
          error,
          isSaveFailure,
          isPostFailure,
        }),
      );
    }
  }
}
