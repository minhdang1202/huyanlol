import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import ChallengeAction from "redux/challenge.redux";
import { ChallengeService } from "services";
import { getImageById } from "utils";

export function* requestGetChallengeInfo({ id }) {
  let response = yield call(ChallengeService.getChallengeInfo, id);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let cover = getImageById(responseData.coverId);
      yield put(ChallengeAction.getChallengeInfoSuccess({ ...responseData, cover }));
    } else {
      yield put(ChallengeAction.getChallengeInfoFailure());
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(ChallengeAction.getChallengeInfoFailure(error));
  }
}
