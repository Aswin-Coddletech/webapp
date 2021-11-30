import { takeEvery } from "redux-saga/effects";
//import { debounce, put, select } from 'redux-saga/effects';

import { INIT } from "./actions";

import //someSelector,
"./selectors";

export function* onInit() {
  yield takeEvery(INIT, function*() {
    //    yield put(getList() as any);
  });
}
