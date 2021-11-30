import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  disbursalSelector,
  saveSTPMEXSuccessSelector
} from "src/redux/loans/selectors";
import {
  userAccountSelector,
  disbursalCreatedUserAccountSelector,
  disbursedUserSelector
} from "src/redux/user-account/selectors";

import { IManualSTPMEXDetailPageData } from "./ManualSTPMEXDetailPage";

export default createStructuredSelector<
  IRootState,
  IManualSTPMEXDetailPageData
>({
  loading: loadingSelector,
  disbursal: disbursalSelector,
  userAccount: userAccountSelector,
  disbursalCreatedUserAccount: disbursalCreatedUserAccountSelector,
  saveSTPMEXSuccess: saveSTPMEXSuccessSelector,
  disbursadUser: disbursedUserSelector
});
