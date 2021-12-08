import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { IProductCardData } from "./ProductCard";

export default createStructuredSelector<IRootState, IProductCardData>({});
