import { createSelector } from "reselect";

import { prefix } from "./actions";

import { IRootState } from "src/redux/reducer";

export const loadingSelector = (state: IRootState) => state[prefix].loading;
export const fileListSelector = (state: IRootState) => state[prefix].fileList;
export const detectedLabelsSelector = (state: IRootState) =>
  state[prefix].detectedLabels;
export const selectedLabelsSelector = (state: IRootState) =>
  state[prefix].selectedLabels;
export const descriptionLabelsSelector = (state: IRootState) =>
  state[prefix].descriptionLabels;

export const base64imageUrlSelector = (state: IRootState) =>
  state[prefix].base64imageUrl;
export const categorySelector = (state: IRootState) => state[prefix].category;
export const subcategorySelector = (state: IRootState) =>
  state[prefix].subcategory;
export const oemSelector = (state: IRootState) => state[prefix].oem;
export const oemProductModelSelector = (state: IRootState) =>
  state[prefix].oemProductModel;
export const oemSerialNumberSelector = (state: IRootState) =>
  state[prefix].oemSerialNumber;
export const buyAmountSelector = (state: IRootState) => state[prefix].buyAmount;

export const submitSuccessSelector = (state: IRootState) =>
  state[prefix].submitSuccess;

export const submitInventoryRequestSelector = createSelector(
  base64imageUrlSelector,
  fileListSelector,
  descriptionLabelsSelector,
  categorySelector,
  subcategorySelector,
  oemSelector,
  oemProductModelSelector,
  oemSerialNumberSelector,
  buyAmountSelector,
  (
    base64imageUrl,
    fileList,
    descriptionLabels,
    category,
    subcategory,
    oem,
    oemProductModel,
    oemSerialNumber,
    buyAmount
  ) => ({
    base64imageUrl: base64imageUrl,
    fileList: fileList,
    descriptionLabels: descriptionLabels,
    category: category,
    subcategory: subcategory,
    oem: oem,
    oemProductModel: oemProductModel,
    oemSerialNumber: oemSerialNumber,
    buyAmount: buyAmount,
    buyCcy: "EUR"
  })
);
