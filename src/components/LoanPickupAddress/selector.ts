import { createStructuredSelector } from "reselect";

import {
  pickupStreetSelector,
  pickupNumberSelector,
  pickupAreaSelector
} from "../../redux/instant-quote/selectors";

import { IRootState } from "../../redux/reducer";

import { ILoanPickupAddressData } from "./LoanPickupAddress";

export default createStructuredSelector<IRootState, ILoanPickupAddressData>({
  pickupStreet: pickupStreetSelector,
  pickupNumber: pickupNumberSelector,
  pickupArea: pickupAreaSelector
});
