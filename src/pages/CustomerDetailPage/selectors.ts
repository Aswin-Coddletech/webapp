import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import { loadingSelector, customerSelector } from "src/redux/customer/selector";
import {
  approvedUserSelector,
  inspectedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { ICustomerDetailPageData } from "./CustomerDetailPage";

export default createStructuredSelector<IRootState, ICustomerDetailPageData>({
  loading: loadingSelector,
  customer: customerSelector,
  userAccount: userAccountSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
