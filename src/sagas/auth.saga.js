import { call, put } from "redux-saga/effects";
import { ApiConstant, AppConstant } from "../const";
import AuthAction from "../redux/auth.redux";
import { AuthService } from "../services";
import Cookie from "js-cookie";
import { login } from "../utils/auth";

export function* requestLogin(action) {
  let isResult = false;
  const { data } = action;
  let response = yield call(AuthService.login, data);

  try {
    let responseData = response.data.data;
    if (response.status === ApiConstant.STT_OK) {
      const { access_token, user_id } = responseData;
      if (access_token && user_id) {
        Cookie.set(AppConstant.KEY_TOKEN, access_token, {
          expires: AppConstant.EXPIRES_TOKEN,
        });
        let storeData = {};
        storeData[AppConstant.KEY_USER_ID] = user_id;
        login(storeData);

        isResult = true;
      }
    }
  } catch (error) {
    console.log(error);
    yield put(AuthAction.authFailure(error));
  }

  if (!isResult) {
    yield put(
      AuthAction.authFailure(response.status === ApiConstant.STT_OK ? ApiConstant.STT_NO_TOKEN : response.data),
    );
  }
}
