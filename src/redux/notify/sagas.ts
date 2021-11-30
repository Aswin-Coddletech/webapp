import { notification } from "antd";
import { takeEvery } from "redux-saga/effects";

const toString = (obj) =>
  Object.entries(obj)
    .map(([key, val]) => `${key}: ${val}`)
    .join(", ");

export function* notify() {
  yield takeEvery("*", (action: any) => {
    if (action.error) {
      console.log("in notify saga, action:", action);
      console.log("in notify saga, action.error:", action.error);
      if (action.error.fields) {
        notification.error({
          message: action.error.code,
          description: action.error.message || toString(action.error.fields),
          duration: 7,
        });
      } else if (
        action.error.response &&
        action.error.response.body &&
        action.error.response.body.error
      ) {
        notification.error({
          message: action.error.code || "Action Failed",
          description:
            action.error.response.body.error ||
            action.error.message ||
            "Unknown Error",
          duration: 7,
        });
      } else {
        notification.error({
          message: action.error.code || "Action Failed",
          description: action.error.message || "Unknown Error",
          duration: 7,
        });
      }
    }
  });
}
