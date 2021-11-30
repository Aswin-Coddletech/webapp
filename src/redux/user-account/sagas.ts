import { put, takeEvery, select } from "redux-saga/effects";

import {
  INIT,
  getUser,
  getPolicyChangedFlag,
  USER_SUCCESS,
  POLICY_SUCCESS,
} from "./actions";

import { userInfoSelector } from "./selectors";

export function* onInit() {
  yield takeEvery(INIT, function*() {
    yield put(getUser() as any);
  });
}

export function* updatePolicyFlag() {
  yield takeEvery(USER_SUCCESS, function*() {
    const selectedUser = yield select(userInfoSelector);
    //console.log("SAGA_USER_SUCCESS",selectedUser);
    yield put(getPolicyChangedFlag(selectedUser) as any);
    //window.localStorage.removeItem('matiExited');
  });

  yield takeEvery(POLICY_SUCCESS, function*() {
    //console.log('SAGA_POLICY_SUCCESS');
    yield put(getUser() as any);
  });
}
