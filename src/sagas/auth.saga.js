import { call, put } from "redux-saga/effects";
import { ApiConstant, AppConstant } from "const";
import AuthAction from "redux/auth.redux";
import { AuthService } from "services";
import Cookie from "js-cookie";
import { getLabel } from "language";

export function* requestLogin(action) {
  let isResult = false;
  const { data } = action;

  let response =
    data.socialType === null ? yield call(AuthService.login, data) : yield call(AuthService.loginSocial, data);

  try {
    let responseData = response.data.data;
    if (response.status === ApiConstant.STT_OK) {
      const { loginToken } = responseData;
      if (loginToken) {
        Cookie.set(AppConstant.KEY_TOKEN, loginToken, {
          expires: AppConstant.EXPIRES_TOKEN,
        });
        isResult = true;
        yield put(AuthAction.authSuccess(responseData));
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
export function* requestRegister(action) {
  const { data } = action;
  try {
    let response = yield call(AuthService.register, data);
    if (response.status === ApiConstant.STT_OK) {
      yield put(AuthAction.authSuccess({ isRegister: true }));
    } else {
      yield put(AuthAction.authFailure({ errors: { details: getLabel("ERR_REGISTER") } }));
    }
  } catch (error) {
    console.log(error);
    yield put(AuthAction.authFailure(error));
  }
}
