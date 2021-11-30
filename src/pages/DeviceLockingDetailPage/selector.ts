import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  userItemSelector,
  lockActionSuccessSelector,
} from "src/redux/user-items/selectors";

import { IDeviceLockingDetailPageData } from "./DeviceLockingDetailPage";

export default createStructuredSelector<
  IRootState,
  IDeviceLockingDetailPageData
>({
  loading: loadingSelector,
  userItem: userItemSelector,
  lockActionSuccess: lockActionSuccessSelector,
});
