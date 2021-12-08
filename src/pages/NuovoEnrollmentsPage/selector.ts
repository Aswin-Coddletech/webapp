import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  userItemsListSelector,
  loadingSelector
} from "src/redux/user-items/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import { INuovoEnrollmentsPageData } from "./NuovoEnrollmentsPage";
import {
  onFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

export default createStructuredSelector<IRootState, INuovoEnrollmentsPageData>({
  list: userItemsListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValue: onFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
