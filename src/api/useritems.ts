import Base from "./base";

export class UserItems extends Base {
  /*list(filters: any = {}) {
    console.log("calling apiClient");
    return this.apiClient.get('inventory', filters);
  }*/

  userItemsList(status: any) {
    let path = "/backoffice/user-items/search?status=" + status;
    console.log("calling apiClient");
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  deviceLockList(status: any, search: any) {
    let path = "/backoffice/user-items/search?" + status + "=" + search;
    console.log("calling apiClient");
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  userItem(itemId: string) {
    console.log("calling apiClient");
    console.log("calling apiClient - input item id is", itemId);
    let path = "/backoffice/user-items/" + itemId;
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  applyLockAction(itemId: string, lockAction: string) {
    console.log("calling apiClient");
    let data = {};
    //lockAction = "test";
    console.log("calling apiClient - input item id is", itemId);
    let path = "/backoffice/user-items/" + itemId + "/" + lockAction;
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }
}
