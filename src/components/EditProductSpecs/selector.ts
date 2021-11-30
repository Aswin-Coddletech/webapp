import { createStructuredSelector } from "reselect";

import {
  categorySelector,
  subcategorySelector,
  oemSelector,
  oemProductModelSelector,
  oemSerialNumberSelector,
  selectedLabelsSelector,
  descriptionLabelsSelector,
  loadingSelector,
  buyAmountSelector
} from "src/redux/add-inventory/selectors";

import { IRootState } from "src/redux/reducer";

import { IEditProductSpecsData } from "./EditProductSpecs";

export default createStructuredSelector<IRootState, IEditProductSpecsData>({
  category: categorySelector,
  subcategory: subcategorySelector,
  oem: oemSelector,
  oemProductModel: oemProductModelSelector,
  oemSerialNumber: oemSerialNumberSelector,
  selectedLabels: selectedLabelsSelector,
  descriptionLabels: descriptionLabelsSelector,
  buyAmount: buyAmountSelector,
  loading: loadingSelector
});
