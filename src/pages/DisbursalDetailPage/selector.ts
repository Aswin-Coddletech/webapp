import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  loanSelector,
  createPayOrderSuccessSelector
} from "src/redux/loans/selectors";
import {
  disbursedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { IDisbursalDetailPageData } from "./DisbursalDetailPage";

export default createStructuredSelector<IRootState, IDisbursalDetailPageData>({
  loading: loadingSelector,
  loan: loanSelector,
  userAccount: userAccountSelector,
  createPayOrderSuccess: createPayOrderSuccessSelector,
  disbursedUser: disbursedUserSelector
});
