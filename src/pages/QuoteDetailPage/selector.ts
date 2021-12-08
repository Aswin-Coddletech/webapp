import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import { loadingSelector, quoteSelector } from "src/redux/quotes/selectors";
import {
  approvedUserSelector,
  inspectedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { IQuoteDetailPageData } from "./QuoteDetailPage";

export default createStructuredSelector<IRootState, IQuoteDetailPageData>({
  loading: loadingSelector,
  quote: quoteSelector,
  userAccount: userAccountSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
