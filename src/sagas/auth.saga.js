import { call, put } from "redux-saga/effects";
import { ApiConstant, AppConstant } from "const";
import AuthAction from "redux/auth.redux";
import UserAction from "redux/user.redux";
import { AuthService } from "services";
import Cookie from "js-cookie";
import { getLabel } from "language";

export function* requestLogin(action) {
  const { data } = action;

  let response = yield call(Boolean(data.socialType) ? AuthService.loginSocial : AuthService.login, data);

  try {
    let responseData = response.data.data;
    if (response.status === ApiConstant.STT_OK) {
      const { loginToken } = responseData;
      if (loginToken) {
        Cookie.set(AppConstant.KEY_TOKEN, loginToken, {
          expires: AppConstant.EXPIRES_TOKEN,
        });
        yield put(AuthAction.authSuccess({ isAuth: true }));
        // Get profile
        yield put(UserAction.requestProfile());
      } else {
        yield put(AuthAction.authFailure({ errors: { details: getLabel("ERR_REGISTER") } }));
      }
    }
  } catch (error) {
    console.log(error);
    yield put(AuthAction.authFailure(error));
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
