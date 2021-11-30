import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import { loansListSelector, loadingSelector } from "src/redux/loans/selectors";
import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";
import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

//import  {onQuoteSearchFilterChangeSelector } from "src/redux/quotes/selectors";

import { IManageLoansPageData } from "./ManageLoansPage";

export default createStructuredSelector<IRootState, IManageLoansPageData>({
  list: loansListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValues: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
