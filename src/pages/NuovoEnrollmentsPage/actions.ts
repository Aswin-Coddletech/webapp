import { getUserItemsList } from "src/redux/user-items/actions";
import { userAccountDetail } from "src/redux/user-account/actions";
import { onFilterChange, onPagenatationChange } from "src/redux/utils/actions";
export default {
  getUser: userAccountDetail,
  getUserItemsList,
  onInit: getUserItemsList,
  onRefresh: getUserItemsList,
  onFilterChange,
  onPagenatationChange
};
