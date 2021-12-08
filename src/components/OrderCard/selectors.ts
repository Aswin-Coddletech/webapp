import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { IOrderCardData } from "./OrderCard";

export default createStructuredSelector<IRootState, IOrderCardData>({});
