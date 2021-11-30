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
import {
  onFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";
import { INewQuotesPageData } from "./NewQuotesPage";

export default createStructuredSelector<IRootState, INewQuotesPageData>({
  list: quotesFilterListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  newQuotesFilter: onFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
