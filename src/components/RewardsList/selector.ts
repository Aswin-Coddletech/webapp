import { createStructuredSelector } from "reselect";

import {} from "../../redux/home-page/selectors";

import { IRootState } from "../../redux/reducer";

import { IRewardsListData } from "./RewardsList";

export default createStructuredSelector<IRootState, IRewardsListData>({});
