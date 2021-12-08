import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import { loadingSelector, orderSelector } from "src/redux/order/selectors";
import {
  approvedUserSelector,
  inspectedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { IOrderDetailPageData } from "./OrderDetailPage";

export default createStructuredSelector<IRootState, IOrderDetailPageData>({
  loading: loadingSelector,
  order: orderSelector,
  userAccount: userAccountSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
