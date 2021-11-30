import { createStructuredSelector } from "reselect";

import {
  userSelector,
  isAuthenticated,
  userEmailSelector,
  refresh_token_exp_time_millisecSelector
} from "src/redux/profile/selectors";
import { IRootState } from "src/redux/reducer";

import { IMainHeaderData } from "./MainHeader";

export default createStructuredSelector<IRootState, IMainHeaderData>({
  user: userSelector,
  isAuthenticated: isAuthenticated,
  refresh_token_exp_time_millisec: refresh_token_exp_time_millisecSelector,
  userEmail: userEmailSelector
});
