import { all } from "redux-saga/effects";

import ApiClient from "src/api/client";

import * as loans from "./loans/sagas";
import * as insurancePolicy from "./insurance-policy/sagas";
import * as inventoryList from "./di-list/sagas";
import * as addInventory from "./add-inventory/sagas";

import * as notify from "./notify/sagas";
import * as profile from "./profile/sagas";
import * as userAccount from "./user-account/sagas";
import * as instantQuote from "./instant-quote/sagas";
import * as signatureDocument from "./signature-document/sagas";
import * as quotes from "./quotes/sagas";

export default function* rootSaga(history: any, api: ApiClient) {
  const init = (sagas: any): any[] =>
    Object.values(sagas).map((func: any) => func(history, api));

  yield all(
    ([] as any[]).concat(
      init(profile),
      init(notify),
      init(inventoryList),
      init(addInventory),
      init(insurancePolicy),
      init(userAccount),
      init(loans),
      init(instantQuote),
      init(signatureDocument),
      init(quotes)
    )
  );
}
