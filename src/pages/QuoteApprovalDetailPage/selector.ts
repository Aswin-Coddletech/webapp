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

import { IQuoteApprovalDetailPageData } from "./QuoteApprovalDetailPage";

export default createStructuredSelector<
  IRootState,
  IQuoteApprovalDetailPageData
>({
  loading: loadingSelector,
  quote: quoteSelector,
  submitSuccess: submitSuccessSelector,
  userAccount: userAccountSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
