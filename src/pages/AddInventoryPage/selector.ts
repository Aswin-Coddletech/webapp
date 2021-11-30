import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import {
  loadingSelector,
  submitSuccessSelector,
  base64imageUrlSelector,
  oemSelector,
  oemProductModelSelector
} from "src/redux/add-inventory/selectors";

import { IAddInventoryPageData } from "./AddInventoryPage";

export default createStructuredSelector<IRootState, IAddInventoryPageData>({
  loading: loadingSelector,
  submitSuccess: submitSuccessSelector,
  base64imageUrl: base64imageUrlSelector,
  oem: oemSelector,
  oemProductModel: oemProductModelSelector
});
