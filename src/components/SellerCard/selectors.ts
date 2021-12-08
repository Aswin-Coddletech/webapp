import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { ISellerCardData } from "./SellerCard";

export default createStructuredSelector<IRootState, ISellerCardData>({});
