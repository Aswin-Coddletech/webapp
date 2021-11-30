import { createStructuredSelector } from "reselect";

import {
  loadingSelector,
  totalSelector,
  pageSelector,
  pageSizeSelector,
  policySelector,
  itemsNotInPolicySelector
} from "src/redux/insurance-policy/selectors";

import { IRootState } from "src/redux/reducer";

import { IInsurancePolicyCardData } from "./InsurancePolicyCard";

export default createStructuredSelector<IRootState, IInsurancePolicyCardData>({
  loading: loadingSelector,
  total: totalSelector,
  page: pageSelector,
  pageSize: pageSizeSelector,
  policy: policySelector,
  itemsNotInPolicy: itemsNotInPolicySelector
});
