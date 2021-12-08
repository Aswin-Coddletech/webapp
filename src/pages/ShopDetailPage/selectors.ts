import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import { loadingSelector, shopSelector } from "src/redux/shop/selector";
import {
  approvedUserSelector,
  inspectedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { IShopDetailPageData } from "./ShopDetailPage";

export default createStructuredSelector<IRootState, IShopDetailPageData>({
  loading: loadingSelector,
  shop: shopSelector,
  userAccount: userAccountSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
