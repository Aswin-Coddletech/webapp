import { createStructuredSelector } from "reselect";

import {
  loadingSelector,
  totalSelector,
  pageSelector,
  pageSizeSelector
} from "src/redux/di-list/selectors";

import { IRootState } from "src/redux/reducer";

import { IStripeButtonData } from "./StripeButton";

export default createStructuredSelector<IRootState, IStripeButtonData>({
  loading: loadingSelector,
  total: totalSelector,
  page: pageSelector,
  pageSize: pageSizeSelector
});
