import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import { shopListSelector, loadingSelector } from "src/redux/shop/selector";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import { IShopPageData } from "./ShopPage";

export default createStructuredSelector<IRootState, IShopPageData>({
  list: shopListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValue: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
