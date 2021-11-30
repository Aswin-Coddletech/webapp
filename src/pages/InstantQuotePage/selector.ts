import { createStructuredSelector } from "reselect";
import { IRootState } from "../../redux/reducer";

import {
  loadingSelector,
  catListSelector,
  brandListSelector,
  modelListSelector,
  inclusionListSelector,
  pickupTimeSlotSelector
} from "../../redux/instant-quote/selectors";

import { IInstantQuotePageData } from "./InstantQuotePage";
import { userIdSelector } from "src/redux/profile/selectors";

export default createStructuredSelector<IRootState, IInstantQuotePageData>({
  loading: loadingSelector,
  catList: catListSelector,
  brandList: brandListSelector,
  modelList: modelListSelector,
  inclusionList: inclusionListSelector,
  pickupTimeSlot: pickupTimeSlotSelector,
  userId: userIdSelector
});
