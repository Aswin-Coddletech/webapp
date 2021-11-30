import { getUserList, clearUserList } from "src/redux/user-account/actions";
import {
  onSearchFilterChange,
  onPagenatationChange
} from "src/redux/utils/actions";
export default {
  getUserList,
  onInit: getUserList,
  onRefresh: getUserList,
  onSearchFilterChange,
  clearUserList,
  onPagenatationChange
};
