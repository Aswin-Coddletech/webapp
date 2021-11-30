import {
  getRewards,
  getLoans,
  getBelongings
} from "src/redux/home-page/actions";

export default {
  onInit: getRewards,
  getRewards: getRewards,
  getLoans: getLoans,
  getBelongings: getBelongings
};
