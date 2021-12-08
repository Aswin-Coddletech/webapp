import { createStructuredSelector } from "reselect";

import { loadingSelector, quoteSelector } from "src/redux/quotes/selectors";

import { IRootState } from "src/redux/reducer";
import { disbursedUserSelector } from "src/redux/user-account/selectors";

import { IDisbursalCardData } from "./DisbursalCard";

export default createStructuredSelector<IRootState, IDisbursalCardData>({
  loading: loadingSelector,
  quote: quoteSelector,
  disbursadUser: disbursedUserSelector
});
