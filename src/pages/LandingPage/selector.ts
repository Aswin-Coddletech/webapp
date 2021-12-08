import { createStructuredSelector } from "reselect";

import {
  userSelector,
  isAuthenticated,
  userEmailSelector,
  id_token_exp_time_millisecSelector,
  refresh_token_exp_time_millisecSelector
} from "src/redux/profile/selectors";

import { IRootState } from "src/redux/reducer";

import { ILandingPageData } from "./LandingPage";

export default createStructuredSelector<IRootState, ILandingPageData>({
  user: userSelector,
  isAuthenticated: isAuthenticated,
  id_token_exp_time_millisec: id_token_exp_time_millisecSelector,
  refresh_token_exp_time_millisec: refresh_token_exp_time_millisecSelector,
  userEmail: userEmailSelector
});
