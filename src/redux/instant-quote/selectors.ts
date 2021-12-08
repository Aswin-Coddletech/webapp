import { createSelector } from "reselect";
import { IRootState } from "../../redux/reducer";
import { prefix } from "./actions";

export const loadingSelector = (state: IRootState) => state[prefix].loading;
export const catListSelector = (state: IRootState) => state[prefix].catList;
export const brandListSelector = (state: IRootState) => state[prefix].brandList;
export const modelListSelector = (state: IRootState) => state[prefix].modelList;
export const inclusionListSelector = (state: IRootState) =>
  state[prefix].inclusionList;
export const pickupTimeSlotSelector = (state: IRootState) =>
  state[prefix].pickupTimeSlot;
export const pickupStreetSelector = (state: IRootState) =>
  state[prefix].pickupStreet;
export const pickupNumberSelector = (state: IRootState) =>
  state[prefix].pickupNumber;
export const pickupAreaSelector = (state: IRootState) =>
  state[prefix].pickupArea;

export const submitPickupAddressSelector = createSelector(
  // getFormValues(newAccountForm)
  pickupStreetSelector,
  pickupNumberSelector,
  pickupAreaSelector,
  //(formData, other fields
  (pickupStreet, pickupNumber, pickupArea) => ({
    pickupStreet: pickupStreet,
    pickupNumber: pickupNumber,
    pickupArea: pickupArea
  })
);
