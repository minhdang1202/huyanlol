import { call, put, all } from "redux-saga/effects";
import { ApiConstant } from "const";
import EditionAction from "redux/edition.redux";
import { EditionService, CommonService } from "services";
import { getCurrentPosition } from "utils";

export function* requestGetLendersList(action) {
  const { editionId, pageNum, pageSize, sort } = action;
  const { latitude, longitude } = getCurrentPosition();
  const bodyReq = {
    criteria: {
      editionId: editionId,
      latitude: latitude,
      longitude: longitude,
      availableStatus: true,
    },
    pageNum: pageNum,
    pageSize: pageSize,
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

      yield put(EditionAction.editionSuccess({ lendersList: lendersList, totalLenders: total }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.editionFailure(error));
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
      yield put(EditionAction.editionSuccess({ rate, review, name, avatar }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.editionFailure(error));
  }
}

export function* requestGetReviews(action) {
  const { editionId, pageNum } = action.data;
  const bodyReq = {
    criteria: {
      editionIds: [editionId],
    },
    pageNum: pageNum,
    pageSize: 10
  };
  let response = yield call(EditionService.getBookReviews, bodyReq);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData } = responseData;
      const avatarsList = yield all(
        pageData.map(review =>
          review.creator.imageId ? call(CommonService.getImageById, review.creator.imageId) : null,
        ),
      );
      const thumbnailsList = yield all(
        pageData.map(review => (review.thumbnailId ? call(CommonService.getImageById, review.thumbnailId) : null)),
      );
      const reviewsList = pageData.map((review, index) => {
        const { articleId, title, intro, lastUpdate, reactCount, commentCount } = review;
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
        };
      });

      yield put(EditionAction.editionSuccess({ reviewsList }));
    }
  } catch (error) {
    console.log(error);
    yield put(EditionAction.editionFailure(error));
  }
}
