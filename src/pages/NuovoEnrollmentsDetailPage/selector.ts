import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  userItemSelector
} from "src/redux/user-items/selectors";

import { INuovoEnrollmentsDetailPageData } from "./NuovoEnrollmentsDetailPage";

export default createStructuredSelector<
  IRootState,
  INuovoEnrollmentsDetailPageData
>({
  loading: loadingSelector,
  userItem: userItemSelector
});
