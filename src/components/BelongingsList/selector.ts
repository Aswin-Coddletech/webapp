import { createStructuredSelector } from "reselect";

import {} from "../../redux/home-page/selectors";

import { IRootState } from "../../redux/reducer";

import { IBelongingsListData } from "./BelongingsList";

export default createStructuredSelector<IRootState, IBelongingsListData>({});
