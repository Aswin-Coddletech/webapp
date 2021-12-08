import { IRootState } from "src/redux/reducer";
import { prefix } from "./actions";

export const onFilterChangeSelector = (state: IRootState) =>
  state[prefix].onFilterChange;
export const onSearchFilterChangeSelector = (state: IRootState) =>
  state[prefix].onSearchFilterChange;
export const onPaginationChangeSelector = (state: IRootState) =>
  state[prefix].onPaginationChange;
