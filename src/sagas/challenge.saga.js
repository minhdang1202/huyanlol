import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import ChallengeAction from "redux/challenge.redux";
import { ChallengeService } from "services";

export function* requestGetChallengeInfo(id) {
  let response = yield call(ChallengeService.getChallengeInfo, id);

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

export function* requestGetLeaderBoard(id) {
  let response = yield call(ChallengeService.getChallengeLeaderBoard, id);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ChallengeAction.challengeDetailLeaderBoardSuccess(responseData));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}

export function* requestGetFriendLeaderBoard(id) {
  let response = yield call(ChallengeService.getChallengeFriendLeaderBoard, id);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ChallengeAction.challengeDetailFriendLeaderBoardSuccesss(responseData));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}

export function* requestGetActivity(id) {
  let response = yield call(ChallengeService.getChallengeActivity, id);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ChallengeAction.challengeDetailActivitySuccess(responseData));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}

export function* requestPutJoin(id) {
  let response = yield call(ChallengeService.putJoinChallenge, id);
  console.log(response.data);
  try {
    if (response.status === ApiConstant.STT_OK) {
      window.location.reload();
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}
