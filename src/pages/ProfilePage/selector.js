import { createStructuredSelector } from "reselect";

import { userSelector } from "src/redux/profile/selectors";

export default createStructuredSelector({
  user: userSelector
});
