import {
  getdeviceLockList,
  clearDeviceLockList
} from "src/redux/user-items/actions";
import { userAccountDetail } from "src/redux/user-account/actions";
import {
  onSearchFilterChange,
  onPagenatationChange
} from "src/redux/utils/actions";
export default {
  getUser: userAccountDetail,
  getdeviceLockList,
  onInit: getdeviceLockList,
  onRefresh: getdeviceLockList,
  onSearchFilterChange,
  clearDeviceLockList,
  onPagenatationChange
};
