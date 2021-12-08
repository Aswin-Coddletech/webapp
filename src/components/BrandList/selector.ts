import { createStructuredSelector } from "reselect";

import {} from "../../redux/di-list/selectors";

import { IRootState } from "../../redux/reducer";

import { IBrandListData } from "./BrandList";

export default createStructuredSelector<IRootState, IBrandListData>({});
