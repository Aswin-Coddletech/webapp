import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { IUserCardData } from "./UserCard";

export default createStructuredSelector<IRootState, IUserCardData>({});
