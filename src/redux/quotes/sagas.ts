import { takeEvery, put } from "redux-saga/effects";
//import { debounce, put, select } from 'redux-saga/effects';

import { INIT, QUOTE_SUCCESS } from "./actions";
import {
  approvedUserAccountDetail,
  inspectedUserAccountDetail,
  userAccountDetail
} from "src/redux/user-account/actions";

import //someSelector,
"./selectors";

export function* onInit() {
  yield takeEvery(INIT, function*() {
    //    yield put(getList() as any);
  });
}

export function* quoteDetail(history, api) {
  yield takeEvery(QUOTE_SUCCESS, function*(action: any) {
    //api.client.setToken(action.data.id_token);
    if (action.data.inspectedBy) {
      yield put(inspectedUserAccountDetail(action.data.inspectedBy) as any);
    }
    if (action.data.approvedBy) {
      yield put(approvedUserAccountDetail(action.data.approvedBy) as any);
    }
    yield put(userAccountDetail(action.data.userId) as any);
    console.log("quote saga", action.data.userId);
  });
}
