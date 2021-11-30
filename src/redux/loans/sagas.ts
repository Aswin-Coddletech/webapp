import { takeEvery, put } from "redux-saga/effects";
//import { debounce, put, select } from 'redux-saga/effects';

import {
  INIT,
  CHANGE_LOAN_STATUS_SUCCESS,
  getLoansList,
  INSPECTION_COMPLETE_SUCCESS,
  LOAN_SUCCESS,
  DISBURSAL_SUCCESS,
  PAYORDER_SUCCESS
} from "./actions";

import //someSelector,
"./selectors";

import {
  userAccountDetail,
  DisbursalCreatedByDetail
} from "src/redux/user-account/actions";

export function* onInit() {
  yield takeEvery(INIT, function*() {
    //    yield put(getList() as any);
  });
}

export function* updateStatusFlag() {
  yield takeEvery(CHANGE_LOAN_STATUS_SUCCESS, function*() {
    yield put(getLoansList("status", "PENDING-APPROVAL") as any);
  });

  yield takeEvery(INSPECTION_COMPLETE_SUCCESS, function*() {
    yield put(getLoansList("status", "PENDING-INSPECTION") as any);
  });
}

export function* loanDetail(history, api) {
  yield takeEvery(LOAN_SUCCESS, function*(action: any) {
    //api.client.setToken(action.data.id_token);
    yield put(userAccountDetail(action.data.userId) as any);
    if (action.data.loanDisbursalRequestCompletedBy) {
      yield put(
        DisbursalCreatedByDetail(
          action.data.loanDisbursalRequestCompletedBy
        ) as any
      );
    }
  });
  yield takeEvery(DISBURSAL_SUCCESS, function*(action: any) {
    //api.client.setToken(action.data.id_token);
    yield put(userAccountDetail(action.data.userId) as any);
  });
  yield takeEvery(PAYORDER_SUCCESS, function*(action: any) {
    yield put(userAccountDetail(action.data.userId) as any);
    if (action.data.createdBy) {
      yield put(DisbursalCreatedByDetail(action.data.createdBy) as any);
    }
  });
}
