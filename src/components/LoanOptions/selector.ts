import { createStructuredSelector } from "reselect";

import {} from "../../redux/di-list/selectors";

import { IRootState } from "../../redux/reducer";

import { ILoanOptionsData } from "./LoanOptions";

export default createStructuredSelector<IRootState, ILoanOptionsData>({});
