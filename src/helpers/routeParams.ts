import { History } from "history";
import qs from "qs";

export const queryStringToObject = str => qs.parse(str);

export const addLocationQuery = (history: History) => {
  history.location = Object.assign(history.location, {
    query: queryStringToObject(history.location.search)
  });
};
