import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  installemntDataSelector,
  installemntPaymentDataSelector,
  loadingSelector,
} from "src/redux/loans/selectors";

import { IInstallmentsDetailPageData } from "./InstallmentsDetailPage";

export default createStructuredSelector<
  IRootState,
  IInstallmentsDetailPageData
>({
  installmentData: installemntDataSelector,
  installmentPaymentData: installemntPaymentDataSelector,
  loading: loadingSelector,
});
