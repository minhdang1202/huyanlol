import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import ChallengeAction from "redux/challenge.redux";
import { ChallengeService } from "services";

export function* requestGetChallengeInfo(action) {
  let response = yield call(ChallengeService.getChallengeInfo, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(ChallengeAction.getChallengeInfoSuccess({ ...responseData }));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}

export function* requestGetLeaderBoard(action) {
  let response = yield call(ChallengeService.getChallengeLeaderBoard, action.data);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ChallengeAction.getChallengeLeaderBoardSuccess(responseData));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}

export function* requestGetFriendLeaderBoard(action) {
  let response = yield call(ChallengeService.getChallengeFriendLeaderBoard, action.data);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ChallengeAction.getChallengeFriendLeaderBoardSuccess(responseData));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}

export function* requestGetActivity(action) {
  const response = yield call(ChallengeService.getChallengeActivity, action.data);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ChallengeAction.getChallengeActivitySuccess(responseData));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
    }
  } catch (error) {
    yield console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}

export function* requestGetChallengeList(action) {
  const response = yield call(ChallengeService.getChallengeListAll, action.data);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ChallengeAction.getChallengeListSuccess(responseData));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
    }
  } catch (error) {
    yield console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}

export function* requestGetChallengeJoinedList(action) {
  const response = yield call(ChallengeService.getChallengeListAll, action.data);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ChallengeAction.getChallengeListJoinedSuccess(responseData));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
    }
  } catch (error) {
    yield console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}

export function* requestGetChallengeRecommendList(action) {
  const response = yield call(ChallengeService.getChallengeListAll, action.data);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ChallengeAction.getChallengeListRecommendSuccess(responseData));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
    }
  } catch (error) {
    yield console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}
