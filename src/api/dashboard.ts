import Base from "./base";

export class Dashboard extends Base {
  statistics() {
    console.log("calling apiClient for dashboard");
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "dashboard/valuerisk";
    } else {
      path = "dashboard";
    }
    let a = this.apiClient.get(path);
    console.log("in dashboard.ts returning api result", a);
    return a;
  }
}
