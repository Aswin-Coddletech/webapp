import { createStructuredSelector } from "reselect";

import {} from "../../redux/instant-quote/selectors";

import { IRootState } from "../../redux/reducer";

import { ICategoryListData } from "./CategoryList";

export default createStructuredSelector<IRootState, ICategoryListData>({});
