import { createStructuredSelector } from "reselect";

import {} from "../../redux/instant-quote/selectors";

import { IRootState } from "../../redux/reducer";

import { IModelListData } from "./ModelList";

export default createStructuredSelector<IRootState, IModelListData>({});
