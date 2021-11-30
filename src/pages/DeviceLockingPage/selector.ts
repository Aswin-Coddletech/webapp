import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  deviceLockListSelector,
  loadingSelector
} from "src/redux/user-items/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import { IDeviceLockingPageData } from "./DeviceLockingPage";
import { onSearchFilterChangeSelector } from "src/redux/utils/selectors";
import { onPaginationChangeSelector } from "src/redux/utils/selectors";

export default createStructuredSelector<IRootState, IDeviceLockingPageData>({
  list: deviceLockListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  deviceFilter: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
