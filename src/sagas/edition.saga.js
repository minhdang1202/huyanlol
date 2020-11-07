import { call, put, all } from "redux-saga/effects";
import { ApiConstant, AppConstant } from "const";
import EditionAction from "redux/edition.redux";
import { EditionService, CommonService } from "services";
import { getCurrentPosition } from "utils";
import { PAGE_SIZE_REVIEWS } from "components/editions/BookReviews";

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
    pageSize: 10,
    sorts: {
      ...sort,
    },
  };
  let response = yield call(EditionService.getBookLenders, bodyReq);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { pageData, total } = responseData;
      const avatarsList = yield all(
        pageData.map(lender => (lender.imageId ? call(CommonService.getImageById, lender.imageId) : null)),
      );
      const lendersList = pageData.map((lender, index) => {
        const { distanceToUser, name, address } = lender;
        return {
          avatar: avatarsList[index],
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
      const avatarsList = yield all(
        pageData.map(lender => (lender.imageId ? call(CommonService.getImageById, lender.imageId) : null)),
      );
      const nearestLenders = pageData.map((lender, index) => {
        const { distanceToUser, name, address } = lender;
        return {
          avatar: avatarsList[index],
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
      const avatar = imageId ? yield call(CommonService.getImageById, imageId) : null;
      yield put(EditionAction.requesEditiontSuccess({ rate, review, name, avatar }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.requestEditionFailure(error));
  }
}

export function* requestGetReviews(action) {
  const { editionId, pageNum, categoryId } = action;
  const bodyReq = {
    criteria: {
      editionIds: [editionId],
      categoryIds: [categoryId],
    },
    pageNum: pageNum,
    pageSize: PAGE_SIZE_REVIEWS,
  };
  let response = yield call(EditionService.getBookReviews, bodyReq);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData, total } = responseData;
      const avatarsList = yield all(
        pageData.map(review =>
          review.creator.imageId ? call(CommonService.getImageById, review.creator.imageId) : null,
        ),
      );
      const thumbnailsList = yield all(
        pageData.map(review => (review.thumbnailId ? call(CommonService.getImageById, review.thumbnailId) : null)),
      );
      const reviewsList = pageData.map((review, index) => {
        const { articleId, title, intro, lastUpdate, reactCount, commentCount, editions } = review;
        const rate = editions[0].userRelation.evaluation.rate;
        const { name } = review.creator;
        return {
          avatar: avatarsList[index],
          thumbnail: thumbnailsList[index],
          articleId,
          title,
          intro,
          name,
          lastUpdate,
          reactCount,
          commentCount,
          rate,
        };
      });

      yield put(EditionAction.getReviewsSuccess({ reviewsList, totalReviews: total }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.getReviewsFailure(error));
  }
}
