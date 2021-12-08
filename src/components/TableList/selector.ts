import { createStructuredSelector } from "reselect";

import {} from "../../redux/home-page/selectors";

import { IRootState } from "../../redux/reducer";

import { ITableListData } from "./TableList";
import { onPaginationChangeSelector } from "src/redux/utils/selectors";

export default createStructuredSelector<IRootState, ITableListData>({});
