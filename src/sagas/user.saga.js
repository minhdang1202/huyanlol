import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import UserAction from "redux/user.redux";
import { UserService } from "services";

export function* requestGetTopWriter(action) {
  let response = yield call(UserService.getTopWriter, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(UserAction.userSuccess({ topWriter: responseData }));
    } else {
      yield put(UserAction.userFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(UserAction.userFailure(error));
  }
}
