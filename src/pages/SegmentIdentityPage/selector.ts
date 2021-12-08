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

import { ISegmentIdentityPageData } from "./SegmentIdentityPage";

export default createStructuredSelector<IRootState, ISegmentIdentityPageData>({
  list: userListSelector,
  loading: loadingSelector,
  segmentFilter: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
