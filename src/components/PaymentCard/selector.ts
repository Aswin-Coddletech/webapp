import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { IPaymentCardData } from "./PaymentCard";

export default createStructuredSelector<IRootState, IPaymentCardData>({});
