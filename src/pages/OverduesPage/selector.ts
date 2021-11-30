import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  installmentsListSelector,
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

import { IOverduesPageData } from "./OverduesPage";

export default createStructuredSelector<IRootState, IOverduesPageData>({
  list: installmentsListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValues: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
