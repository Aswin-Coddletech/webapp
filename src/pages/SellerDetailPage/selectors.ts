import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import { loadingSelector, sellerSelector } from "src/redux/seller/selectors";
import {
  approvedUserSelector,
  inspectedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { ISellerDetailPageData } from "./SellerDetailPage";

export default createStructuredSelector<IRootState, ISellerDetailPageData>({
  loading: loadingSelector,
  seller: sellerSelector,
  userAccount: userAccountSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
