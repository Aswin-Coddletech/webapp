import { createStructuredSelector } from "reselect";

import {
  loadingSelector,
  totalSelector,
  pageSelector,
  pageSizeSelector,
  loanSelector
} from "src/redux/loans/selectors";

import { IRootState } from "src/redux/reducer";

import { ILoanCardData } from "./LoanCard";

export default createStructuredSelector<IRootState, ILoanCardData>({
  loading: loadingSelector,
  total: totalSelector,
  page: pageSelector,
  pageSize: pageSizeSelector,
  loan: loanSelector
});
