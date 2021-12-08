import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { ICustomerCardData } from "./CustomerCard";

export default createStructuredSelector<IRootState, ICustomerCardData>({});
