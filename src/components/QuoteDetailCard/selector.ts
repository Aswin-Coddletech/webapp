import { createStructuredSelector } from "reselect";

import { loadingSelector, quoteSelector } from "src/redux/quotes/selectors";
import { userAccountSelector } from "src/redux/user-account/selectors";

import { IRootState } from "src/redux/reducer";

import { IQuoteDetailCardData } from "./QuoteDetailCard";

export default createStructuredSelector<IRootState, IQuoteDetailCardData>({
  loading: loadingSelector,
  quote: quoteSelector,
  userAccount: userAccountSelector
});
