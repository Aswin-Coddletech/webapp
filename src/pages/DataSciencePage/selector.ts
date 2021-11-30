import { createStructuredSelector } from "reselect";

import { IRootState } from "src/redux/reducer";

import { IDataSciencePageData } from "./DataSciencePage";

export default createStructuredSelector<IRootState, IDataSciencePageData>({});
