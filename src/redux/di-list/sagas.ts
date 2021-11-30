import { debounce, put, takeEvery } from "redux-saga/effects";

import {
  CHANGE_INVENTORY_FILTER,
  CHANGE_PAGE,
  CHANGE_PAGE_SIZE,
  getSummary,
  INIT,
  getList
} from "./actions";

export function* onInit() {
  yield takeEvery(INIT, function*() {
    yield put(getList() as any);
    yield put(getSummary() as any);
  });
}

export function* handleFiltersChange() {
  const actions = [CHANGE_PAGE, CHANGE_PAGE_SIZE, CHANGE_INVENTORY_FILTER];

  yield debounce(300, actions, function*() {
    yield put(getList() as any);
    yield put(getSummary() as any);
  });
}
