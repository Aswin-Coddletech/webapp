import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  frEnrollSuccessSelector,
  loadingSelector,
  quoteSelector
} from "src/redux/quotes/selectors";
import {
  approvedUserSelector,
  inspectedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { IEnrollmentDetailPageData } from "./EnrollmentDetailPage";

export default createStructuredSelector<IRootState, IEnrollmentDetailPageData>({
  loading: loadingSelector,
  quote: quoteSelector,
  userAccount: userAccountSelector,
  frEnrollSuccess: frEnrollSuccessSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
