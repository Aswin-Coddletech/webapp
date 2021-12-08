import { createStructuredSelector } from "reselect";

import {} from "../../redux/home-page/selectors";

import { IRootState } from "../../redux/reducer";

import { ILoanHomeListData } from "./LoanHomeList";

export default createStructuredSelector<IRootState, ILoanHomeListData>({});
