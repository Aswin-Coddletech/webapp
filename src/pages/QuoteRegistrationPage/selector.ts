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

import { IQuoteRegistrationPageData } from "./QuoteRegistrationPage";

export default createStructuredSelector<IRootState, IQuoteRegistrationPageData>(
  {
    list: quotesListSelector,
    loading: loadingSelector,
    userAccount: userAccountSelector,
    userAccountLoading: userAccountLoadingSelector,
    registerFilter: onFilterChangeSelector,
    currentPage: onPaginationChangeSelector
  }
);
