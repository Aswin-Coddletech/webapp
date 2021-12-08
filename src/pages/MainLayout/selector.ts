import { createStructuredSelector } from "reselect";

import {
  loadingSelector,
  isAuthenticated,
  id_token_exp_time_millisecSelector,
  refresh_token_exp_time_millisecSelector,
  langSelector,
  userIdSelector,
  userEmailSelector
} from "src/redux/profile/selectors";

import { IRootState } from "src/redux/reducer";

import { IMainLayoutData } from "./MainLayout";

export default createStructuredSelector<IRootState, IMainLayoutData>({
  loading: loadingSelector,
  isAuthenticated: isAuthenticated,
  id_token_exp_time_millisec: id_token_exp_time_millisecSelector,
  refresh_token_exp_time_millisec: refresh_token_exp_time_millisecSelector,
  lang: langSelector,
  userId: userIdSelector,
  userEmail: userEmailSelector
});
