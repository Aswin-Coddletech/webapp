import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import { loadingSelector, payOrderSelector } from "src/redux/loans/selectors";
import {
  disbursedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { IPayOrdersDetailPageData } from "./PayOrdersDetailPage";

export default createStructuredSelector<IRootState, IPayOrdersDetailPageData>({
  loading: loadingSelector,
  payOrder: payOrderSelector,
  userAccount: userAccountSelector,
  disbursadUser: disbursedUserSelector
});
