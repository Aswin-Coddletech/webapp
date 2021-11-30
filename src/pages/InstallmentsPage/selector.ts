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

import { IInstallmentsPageData } from "./InstallmentsPage";

export default createStructuredSelector<IRootState, IInstallmentsPageData>({
  list: installmentsListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValues: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
