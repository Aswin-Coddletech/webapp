import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  userListSelector,
  loadingSelector
} from "src/redux/user-account/selectors";
import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import { IKycStatusPageData } from "./KycStatusPage";

export default createStructuredSelector<IRootState, IKycStatusPageData>({
  list: userListSelector,
  loading: loadingSelector,
  filterValue: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
