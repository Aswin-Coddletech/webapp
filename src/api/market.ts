import Base from "./base";

export class Market extends Base {
  /*list(filters: any = {}) {
    console.log("calling apiClient");
    return this.apiClient.get('inventory', filters);
  }*/
  marketbuyitemslist() {
    console.log("calling apiClient");
    let a = this.apiClient.get("marketbuyitems");
    console.log("in market.ts returning api result", a);
    return a;
  }
  marketsellitemslist() {
    console.log("calling apiClient");
    let a = this.apiClient.get("marketsellitems");
    console.log("in market.ts returning api result", a);
    return a;
  }
  additem(pageData: any) {
    console.log("calling apiClient");
    console.log("calling apiClient - input pageData for additem is", pageData);
    let a = this.apiClient.post("marketbuyitems", pageData);
    console.log("in market.ts returning api result", a);
    return a;
  }

  statistics(query: {}) {
    console.log("calling apiClient");
    console.log("calling apiClient - getiing market statistics", query);
    let a = this.apiClient.get("usersnotingroup");
    console.log("in market.ts returning api result", a);
    return a;
  }

  insertnewitem(data: {}) {
    console.log("calling apiClient");
    console.log("calling apiClient - inserting new item", data);
    let a = this.apiClient.post("sometable", data);
    console.log("in market.ts returning api result", a);
    return a;
  }

  list(query: {}) {
    console.log("calling apiClient");
    let a = this.apiClient.get("sometable", query);
    console.log("in market.ts returning api result", a);
    return a;
  }
}
