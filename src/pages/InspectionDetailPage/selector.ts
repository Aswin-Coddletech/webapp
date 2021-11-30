import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  quoteSelector,
  submitSuccessSelector
} from "src/redux/quotes/selectors";
import {
  approvedUserSelector,
  inspectedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { IInspectionDetailPageData } from "./InspectionDetailPage";
import {
  installmentsListSelector,
  loansListSelector
} from "src/redux/loans/selectors";
import { deviceLockListSelector } from "src/redux/user-items/selectors";

import { onPaginationChangeSelector } from "src/redux/utils/selectors";

export default createStructuredSelector<IRootState, IInspectionDetailPageData>({
  loading: loadingSelector,
  quote: quoteSelector,
  submitSuccess: submitSuccessSelector,
  userAccount: userAccountSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector,
  installmentList: installmentsListSelector,
  loansList: loansListSelector,
  deviceList: deviceLockListSelector,
  currentPage: onPaginationChangeSelector
});
