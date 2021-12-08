import { createStructuredSelector } from "reselect";

import {
  isAuthenticated,
  id_token_exp_time_millisecSelector,
  refresh_token_exp_time_millisecSelector
} from "src/redux/profile/selectors";

export default createStructuredSelector({
  isAuthenticated,
  id_token_exp_time_millisec: id_token_exp_time_millisecSelector,
  refresh_token_exp_time_millisec: refresh_token_exp_time_millisecSelector
});
