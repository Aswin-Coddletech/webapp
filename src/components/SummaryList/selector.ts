import { createStructuredSelector } from "reselect";

import {} from "../../redux/home-page/selectors";

import { IRootState } from "../../redux/reducer";

import { ISummaryListData } from "./SummaryList";

export default createStructuredSelector<IRootState, ISummaryListData>({});
