import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  userAccountSelector,
  approvedUserSelector,
  inspectedUserSelector,
  kycSubmitSuccessSelector
} from "src/redux/user-account/selectors";

import {
  installmentsListSelector,
  loansListSelector
} from "src/redux/loans/selectors";
import { quoteSelector } from "src/redux/quotes/selectors";
import { deviceLockListSelector } from "src/redux/user-items/selectors";
//import { submitSuccessSelector } from "src/redux/quotes/selectors";

import { IUserDetailPageData } from "./UserDetailPage";

export default createStructuredSelector<IRootState, IUserDetailPageData>({
  loading: loadingSelector,
  userAccount: userAccountSelector,
  quote: quoteSelector,
  kycSubmitSuccess: kycSubmitSuccessSelector,
  installmentList: installmentsListSelector,
  loansList: loansListSelector,
  deviceList: deviceLockListSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
