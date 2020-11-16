import { call, put } from "redux-saga/effects";
import { ApiConstant, AppConstant } from "const";
import EditionAction from "redux/edition.redux";
import { EditionService } from "services";
import { getCurrentPosition, getImageById } from "utils";

export function* requestGetLendersList(action) {
  const { editionId, pageNum, sort } = action;
  const { latitude, longitude } = getCurrentPosition();
  const bodyReq = {
    criteria: {
      editionId: editionId,
      latitude: latitude,
      longitude: longitude,
      availableStatus: true,
    },
    pageNum: pageNum,
    pageSize: AppConstant.DATA_SIZES.articles,
    sorts: {
      ...sort,
    },
  };
  let response = yield call(EditionService.getBookLenders, bodyReq);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { pageData, total } = responseData;
      const lendersList = pageData.map(lender => {
        const { distanceToUser, name, address, imageId } = lender;
        const avatar = imageId ? getImageById(imageId) : null;
        return {
          avatar,
          distanceToUser,
          name,
          address,
        };
      });

      yield put(EditionAction.getLendersListSuccess({ lendersList: lendersList, totalLenders: total }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.getLendersListFailure(error));
  }
}

export function* requestGetNearestLenders(action) {
  const { editionId } = action;
  const { latitude, longitude } = getCurrentPosition();
  const bodyReq = {
    criteria: {
      editionId: editionId,
      latitude: latitude,
      longitude: longitude,
      availableStatus: true,
    },
    pageNum: 1,
    pageSize: 4,
    sorts: {
      distanceToUser: AppConstant.SORT_ORDER.asc,
    },
  };
  let response = yield call(EditionService.getBookLenders, bodyReq);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { pageData, total } = responseData;
      pageData = pageData.slice(0, 4);
      const nearestLenders = pageData.map(lender => {
        const { distanceToUser, name, address, imageId } = lender;
        const avatar = imageId ? getImageById(imageId) : null;
        return {
          avatar,
          distanceToUser,
          name,
          address,
        };
      });

      yield put(EditionAction.getNearestLendersSuccess({ nearestLenders: nearestLenders, totalLenders: total }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.getNearestLendersFailure(error));
  }
}

export function* requestGetTotalLenders(action) {
  const { editionId } = action;
  const bodyReq = {
    criteria: {
      editionId: editionId,
    },
  };
  let response = yield call(EditionService.getBookLenders, bodyReq);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { total } = responseData;
      yield put(EditionAction.getTotalLendersSuccess({ totalLenders: total }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.getTotalLendersFailure(error));
  }
}

export function* requestGetSelfReview(action) {
  const { editionId } = action;
  let response = yield call(EditionService.getSelfReview, editionId);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { rate, review } = responseData.userRelation.evaluation;
      const { name, imageId } = responseData.users;
      const avatar = imageId ? getImageById(imageId) : null;
      yield put(EditionAction.requestEditionSuccess({ rate, review, name, avatar }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.requestEditionFailure(error));
  }
}

export function* requestGetReviews(action) {
  const { data } = action;

  let response = yield call(EditionService.getBookReviews, data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData, total } = responseData;
      const reviewsList = pageData.map(review => {
        const {
          articleId,
          title,
          intro,
          lastUpdate,
          reactCount,
          commentCount,
          editions,
          thumbnailId,
          creator,
          categories,
          hashtags,
        } = review;
        const rate = editions.length && editions[0].userRelation ? editions[0].userRelation.evaluation.rate : null;
        const bookName = editions.length ? editions[0].title : null;
        const editionId = editions.length ? editions[0].editionId : null;
        const avatar = creator.imageId ? getImageById(creator.imageId) : null;
        const thumbnail = thumbnailId ? getImageById(thumbnailId) : null;
        const { name } = creator;
        return {
          avatar,
          thumbnail,
          articleId,
          title,
          intro,
          name,
          lastUpdate,
          reactCount,
          commentCount,
          rate,
          bookName,
          editionId,
          categories,
          hashtags,
        };
      });

      yield put(EditionAction.getReviewsSuccess({ reviewsList, totalReviews: total }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.getReviewsFailure(error));
  }
}

export function* requestGetBookSuggestion(action) {
  let response = yield call(EditionService.getBookSuggestion, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let hasData = responseData.resultInfo && Array.isArray(responseData.resultInfo);
      yield put(EditionAction.requestEditionSuccess({ suggestions: hasData ? responseData.resultInfo : [] }));
    } else {
      yield put(EditionAction.requestEditionFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.requestEditionFailure(error));
  }
}
