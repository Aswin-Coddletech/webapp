import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  loadingSelector,
  loanSelector,
  submitSuccessSelector
} from "src/redux/loans/selectors";

import { itemSelector } from "src/redux/di-list/selectors";

import {
  userIdSelector,
  orgIdSelector,
  userEmailSelector,
  idTokenSelector
} from "src/redux/profile/selectors";

import { INewLoanPageData } from "./NewLoanPage";

export default createStructuredSelector<IRootState, INewLoanPageData>({
  loading: loadingSelector,
  loan: loanSelector,
  item: itemSelector,
  userId: userIdSelector,
  orgId: orgIdSelector,
  apitoken: idTokenSelector,
  userEmail: userEmailSelector,
  submitSuccess: submitSuccessSelector
});
