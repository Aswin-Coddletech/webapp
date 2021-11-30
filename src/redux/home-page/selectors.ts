import { IRootState } from "../../redux/reducer";
import { prefix } from "./actions";

export const rewardsListSelector = (state: IRootState) =>
  state[prefix].rewardsList;
export const loansListSelector = (state: IRootState) => state[prefix].loansList;
export const belongingsListSelector = (state: IRootState) =>
  state[prefix].belongingsList;
