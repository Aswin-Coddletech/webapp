import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { ILoanCardData } from "./LoanCard";

export default createStructuredSelector<IRootState, ILoanCardData>({});
