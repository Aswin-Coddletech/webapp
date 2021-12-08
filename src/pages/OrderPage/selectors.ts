import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import { orderListSelector, loadingSelector } from "src/redux/order/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import { IOrderPageData } from "./OrderPage";

export default createStructuredSelector<IRootState, IOrderPageData>({
  list: orderListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValue: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
