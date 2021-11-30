import { takeEvery } from "redux-saga/effects";

import { ROUTES } from "src/constants/routes";
import { CAUGHT_LOGIN_CALLBACK } from "src/redux/cognito/actions";
import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  CHANGE_TOKENS,
  NEWTOKENS_SUCCESS,
  NEWTOKENS_FAILURE,
} from "src/redux/profile/actions";

export function* loginSuccess(history, api) {
  yield takeEvery(CAUGHT_LOGIN_CALLBACK, function*(action: any) {
    api.client.setToken(action.data.id_token);
    api.client.setAccessToken(action.data.access_token);
    api.client.setRefreshToken(action.data.refresh_token);
    api.client.setUserId(action.data.userId);
    api.client.setUserEmail(action.data.userEmail);
    api.client.setOrgId(action.data.orgId);
    api.client.setAuth_time_millisec(action.data.auth_time_millisec);
    api.client.setId_token_exp_time_millisec(
      action.data.id_token_exp_time_millisec
    );
    api.client.setRefresh_token_exp_time_millisec(
      action.data.refresh_token_exp_time_millisec
    );
    console.log("in profile sagas loginsuccess", action.data.userEmail);
    yield window.location.replace(ROUTES.HOME);
  });
}

export function* changeTokensSuccess(history, api) {
  yield takeEvery(CHANGE_TOKENS, function*(action: any) {
    console.log("in profle sagas changeTokenSuccess");
    api.client.setToken(action.payload.id_token);
    api.client.setId_token_exp_time_millisec(
      action.payload.id_token_exp_time_millisec
    );
    yield true;
  });
}

export function* fetchNewTokensSuccess(history, api) {
  yield takeEvery(NEWTOKENS_SUCCESS, function*(action: any) {
    console.log("in profle sagas fetchNewTokensSuccess");
    api.client.setToken(action.data.id_token);
    api.client.setId_token_exp_time_millisec(
      action.data.id_token_exp_time_millisec
    );
    yield true;
  });
}

export function* fetchNewTokensFailure() {
  yield takeEvery(NEWTOKENS_FAILURE, function*() {
    yield window.location.replace(ROUTES.LOGIN);
  });
}

export function* login() {
  yield takeEvery(LOGIN, function*() {
    yield window.location.replace(ROUTES.LOGIN);
  });
}

export function* logout(history, api) {
  yield takeEvery(LOGOUT, function*() {
    api.client.removeToken();
    api.client.removeAccessToken();
    api.client.removeRefreshToken();
    api.client.removeUserId();
    api.client.removeUserEmail();
    api.client.removeOrgId();
    api.client.removeAuth_time_millisec();
    api.client.removeId_token_exp_time_millisec();
    api.client.removeRefresh_token_exp_time_millisec();
    api.client.removeCountry();
    yield window.location.replace(ROUTES.LANDING_PAGE);
  });
}

export function* signup() {
  yield takeEvery(SIGNUP, function*() {
    yield window.location.replace(ROUTES.SIGNUP);
  });
}
