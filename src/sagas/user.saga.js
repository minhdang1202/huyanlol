import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import UserAction from "redux/user.redux";
import { UserService } from "services";
import CookieUtil from "utils/cookie";

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

export function* requestGetUserProfile() {
  let response = yield call(UserService.getUserProfile);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      CookieUtil.setCookieData(responseData);
      yield put(UserAction.userSuccess({ profile: responseData }));
    } else {
      yield put(UserAction.userFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(UserAction.userFailure(error));
  }
}

export function* requestImage(action) {
  let response = yield call(UserService.postImage, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(UserAction.userSuccess({ imageId: responseData.imageId }));
    } else {
      yield put(UserAction.userFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(UserAction.userFailure(error));
  }
}

export function* requestGetUserSuggestion(action) {
  let response = yield call(UserService.getUserSuggestion, action.data);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(UserAction.userSuccess({ suggestions: responseData }));
    } else {
      yield put(UserAction.userFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(UserAction.userFailure(error));
  }
}
