import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  loadingSelector,
  paymentListSelector
} from "src/redux/loans/selectors";
import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import { ILoanRepaymentPageData } from "./LoanRepaymentPage";

export default createStructuredSelector<IRootState, ILoanRepaymentPageData>({
  loading: loadingSelector,
  list: paymentListSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValues: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
