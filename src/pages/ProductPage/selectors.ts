import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  productListSelector,
  loadingSelector
} from "src/redux/product/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import { IProductPageData } from "./ProductPage";

export default createStructuredSelector<IRootState, IProductPageData>({
  list: productListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValue: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
