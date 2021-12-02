import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import { loadingSelector, productSelector } from "src/redux/product/selectors";
import {
  approvedUserSelector,
  inspectedUserSelector,
  userAccountSelector
} from "src/redux/user-account/selectors";

import { IProductDetailPageData } from "./ProductDetailPage";

export default createStructuredSelector<IRootState, IProductDetailPageData>({
  loading: loadingSelector,
  product: productSelector,
  userAccount: userAccountSelector,
  inspectedUser: inspectedUserSelector,
  approvedUser: approvedUserSelector
});
