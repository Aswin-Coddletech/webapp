import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { IQuoteCardData } from "./QuoteCard";

export default createStructuredSelector<IRootState, IQuoteCardData>({});
