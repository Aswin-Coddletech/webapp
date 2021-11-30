import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  policiesListSelector,
  loadingSelector,
  pageSelector,
  pageSizeSelector,
  totalSelector
} from "src/redux/insurance-policy/selectors";

import { IManagePoliciesPageData } from "./ManagePoliciesPage";

export default createStructuredSelector<IRootState, IManagePoliciesPageData>({
  list: policiesListSelector,
  loading: loadingSelector,
  total: totalSelector,
  page: pageSelector,
  pageSize: pageSizeSelector
});
