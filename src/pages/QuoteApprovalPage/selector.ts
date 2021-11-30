import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  quotesListSelector,
  loadingSelector
} from "src/redux/quotes/selectors";

import {
  onFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import { IQuoteApprovalPageData } from "./QuoteApprovalPage";

export default createStructuredSelector<IRootState, IQuoteApprovalPageData>({
  list: quotesListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValue: onFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
