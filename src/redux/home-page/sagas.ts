import { put, takeEvery } from "redux-saga/effects";

import { INIT, getRewards } from "./actions";

export function* onInit() {
  yield takeEvery(INIT, function*() {
    yield put(getRewards() as any);
  });
}
