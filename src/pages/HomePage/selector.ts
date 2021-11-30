import { createStructuredSelector } from "reselect";

import {
  rewardsListSelector,
  loansListSelector,
  belongingsListSelector
} from "src/redux/home-page/selectors";

import { IRootState } from "src/redux/reducer";

import { IHomePageData } from "./HomePage";

export default createStructuredSelector<IRootState, IHomePageData>({
  rewardsList: rewardsListSelector,
  loansList: loansListSelector,
  belongingsList: belongingsListSelector
});
