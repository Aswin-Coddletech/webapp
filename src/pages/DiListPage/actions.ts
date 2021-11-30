import { getList, changeItem } from "src/redux/di-list/actions";

export default {
  onInit: getList,
  changeSelectedItem: changeItem
};
