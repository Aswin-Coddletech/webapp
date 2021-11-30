import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  quotesFilterListSelector,
  loadingSelector
} from "src/redux/quotes/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import { IQuotesSearchPageData } from "./QuotesSearchPage";
import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

export default createStructuredSelector<IRootState, IQuotesSearchPageData>({
  list: quotesFilterListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValues: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
