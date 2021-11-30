import { put, takeEvery } from "redux-saga/effects";

import { INIT, getCategory } from "./actions";

export function* onInit() {
  yield takeEvery(INIT, function*() {
    yield put(getCategory() as any);
  });
}
