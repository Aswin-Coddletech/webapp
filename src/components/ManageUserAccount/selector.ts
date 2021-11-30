import { createStructuredSelector } from "reselect";

import {
  loadingSelector,
  isPolicyChangedSelector
} from "src/redux/user-account/selectors";

import { IRootState } from "src/redux/reducer";

import { IManageUserAccountData } from "./ManageUserAccount";

export default createStructuredSelector<IRootState, IManageUserAccountData>({
  loading: loadingSelector,
  isPolicyChanged: isPolicyChangedSelector
});
