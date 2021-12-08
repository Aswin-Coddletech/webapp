import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { IShopCardData } from "./ShopCard";

export default createStructuredSelector<IRootState, IShopCardData>({});
