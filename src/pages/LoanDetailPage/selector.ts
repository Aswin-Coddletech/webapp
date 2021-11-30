import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import { loadingSelector, loanSelector } from "src/redux/loans/selectors";
import {
  userAccountSelector,
  disbursedUserSelector
} from "src/redux/user-account/selectors";

import { ILoanDetailPageData } from "./LoanDetailPage";

export default createStructuredSelector<IRootState, ILoanDetailPageData>({
  loading: loadingSelector,
  loan: loanSelector,
  userAccount: userAccountSelector,
  disbursedUser: disbursedUserSelector
});
