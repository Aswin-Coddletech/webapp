import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  payOrdersListSelector,
  loadingSelector
} from "src/redux/loans/selectors";

import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import { IPayOrdersPageData } from "./PayOrdersPage";

export default createStructuredSelector<IRootState, IPayOrdersPageData>({
  list: payOrdersListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValues: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
