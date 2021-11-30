import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  userListSelector,
  loadingSelector
} from "src/redux/user-account/selectors";
import {
  onSearchFilterChangeSelector,
  onPaginationChangeSelector
} from "src/redux/utils/selectors";

import { IUserSearchPageData } from "./UserSearchPage";

export default createStructuredSelector<IRootState, IUserSearchPageData>({
  list: userListSelector,
  loading: loadingSelector,
  filterUsers: onSearchFilterChangeSelector,
  currentPage: onPaginationChangeSelector
});
