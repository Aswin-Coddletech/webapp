import { createStructuredSelector } from "reselect";

import {} from "../../redux/di-list/selectors";

import { IRootState } from "../../redux/reducer";

import { ILoanPickupData } from "./LoanPickup";

export default createStructuredSelector<IRootState, ILoanPickupData>({});
