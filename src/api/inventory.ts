import Base from "./base";

export class Inventory extends Base {
  /*list(filters: any = {}) {
    console.log("calling apiClient");
    return this.apiClient.get('inventory', filters);
  }*/
  list() {
    console.log("calling apiClient");
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "inventory/list";
    } else {
      path = "inventory";
    }

    let a = this.apiClient.get(path);
    console.log("in inventory.ts returning api result", a);
    return a;
  }

  summary(filters: any = {}) {
    return this.apiClient.get("inventory/summary", filters);
  }

  statistics(filters: any = {}) {
    return this.apiClient.get("inventory/statistics", filters);
  }

  detectimage(base64imageUrl: string) {
    console.log("calling apiClient for detectimage");

    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "doesnt matter";
    } else {
      path = "detectimage";
    }

    if (process.env.NODE_ENV === "production") {
      let a = this.apiClient.getImageLabels(base64imageUrl);
      console.log("in inventory.ts returning api result", a);
      return a;
    } else {
      let a = this.apiClient.get(path);
      console.log("in inventory.ts returning api result", a);
      return a;
    }
  }

  additem(data: {}) {
    console.log("calling apiClient");
    console.log("calling apiClient - inserting new inventory item", data);
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "inventory/additem";
    } else {
      path = "inventory";
    }
    let a = this.apiClient.post(path, data);
    console.log("in inventory.ts returning api result", a);
    return a;
  }
}
