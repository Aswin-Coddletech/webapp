import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { IUserItemCardData } from "./UserItemCard";

export default createStructuredSelector<IRootState, IUserItemCardData>({});
