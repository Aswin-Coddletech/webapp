export const prefix = "utils";

export const SEARCH_FILTER_CHANGE = `${prefix}/SEARCH_FILTER_CHANGE`;
export const onSearchFilterChange = (filter: any) => ({
  payload: filter,
  type: SEARCH_FILTER_CHANGE
});

export const FILTER_CHANGE = `${prefix}/FILTER_CHANGE`;
export const onFilterChange = (filter: string) => ({
  payload: filter,
  type: FILTER_CHANGE
});

export const ON_PAGINATION_CHANGE = `${prefix}/ON_PAGINATION_CHANGE`;
export const onPagenatationChange = (pageNumber: number) => ({
  payload: pageNumber,
  type: ON_PAGINATION_CHANGE
});
