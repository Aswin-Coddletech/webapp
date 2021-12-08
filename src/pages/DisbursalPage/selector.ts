import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  loansListSelector,
  disbursalListSelector,
  disbursalBBVAListSelector,
  loadingSelector
} from "src/redux/loans/selectors";
import {
  onFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import {
  userAccountSelector,
  userAccountLoadingSelector
} from "src/redux/user-account/selectors";

import { IDisbursalPageData } from "./DisbursalPage";

export default createStructuredSelector<IRootState, IDisbursalPageData>({
  payOrderNotCreatedList: loansListSelector,
  manulSTPMEXList: disbursalListSelector,
  manualBBVAList: disbursalBBVAListSelector,
  loading: loadingSelector,
  userAccount: userAccountSelector,
  userAccountLoading: userAccountLoadingSelector,
  filterValue: onFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
