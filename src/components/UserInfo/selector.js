import { createStructuredSelector, createSelector } from "reselect";

import { list, selected } from "src/redux/users/selectors";

export default createStructuredSelector({
  user: createSelector([selected, list], (id, l) => l.find(u => u.id === id))
});
