import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  paymentDetailSelector
} from "src/redux/loans/selectors";
import { userAccountSelector } from "src/redux/user-account/selectors";

import { IRepaymentDetailPageData } from "./RepaymentDetailPage";

export default createStructuredSelector<IRootState, IRepaymentDetailPageData>({
  loading: loadingSelector,
  userAccount: userAccountSelector,
  paymentDetail: paymentDetailSelector
});
