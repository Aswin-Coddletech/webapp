import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  customerListSelector,
  loadingSelector
} from "src/redux/customer/selector";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import { ICustomerPageData } from "./CustomerPage";

export default createStructuredSelector<IRootState, ICustomerPageData>({
  list: customerListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValues: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
