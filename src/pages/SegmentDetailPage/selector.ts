import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  userAccountSelector,
} from "src/redux/user-account/selectors";

import { ISegmentDetailPageData } from "./SegmentDetailPage";

export default createStructuredSelector<IRootState, ISegmentDetailPageData>({
  loading: loadingSelector,
  userAccount: userAccountSelector,
});
