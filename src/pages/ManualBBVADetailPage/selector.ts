import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  disbursalSelector,
  saveBBVASuccessSelector
} from "src/redux/loans/selectors";
import {
  disbursedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { IManualBBVADetailPageData } from "./ManualBBVADetailPage";

export default createStructuredSelector<IRootState, IManualBBVADetailPageData>({
  loading: loadingSelector,
  disbursal: disbursalSelector,
  userAccount: userAccountSelector,
  saveBBVASuccess: saveBBVASuccessSelector,
  disbursadUser: disbursedUserSelector
});
