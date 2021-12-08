import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  loadingSelector,
  userInfoSelector,
  isPolicyChangedSelector
} from "src/redux/user-account/selectors";

import { IManageUserAccountPageData } from "./ManageUserAccountPage";

export default createStructuredSelector<IRootState, IManageUserAccountPageData>(
  {
    loading: loadingSelector,
    userInfo: userInfoSelector,
    isPolicyChanged: isPolicyChangedSelector
  }
);
