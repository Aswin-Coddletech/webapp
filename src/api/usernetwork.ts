import Base from "./base";

export class Usernetwork extends Base {
  /*list(filters: any = {}) {
    console.log("calling apiClient");
    return this.apiClient.get('inventory', filters);
  }*/
  grouplist() {
    console.log("calling apiClient");
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "groups/getlist";
    } else {
      path = "groups";
    }
    let a = this.apiClient.get(path);
    console.log("in usernetwork.ts returning api result", a);
    return a;
  }

  usersnotingroup(groupId: string) {
    console.log("calling apiClient");
    console.log(
      "calling apiClient - getiing users not in group for groupId",
      groupId
    );
    let a = this.apiClient.get("groups/usersnotingroup");
    console.log("in usernetwork.ts returning api result", a);
    return a;
  }

  addgroup(pageData: any) {
    console.log("calling apiClient");
    console.log(
      "calling apiClient - input pageData for addgroups is",
      pageData
    );
    let a = this.apiClient.post("groups/addgroup", pageData);
    console.log("in usernetwork.ts returning api result", a);
    return a;
  }

  insertusertogroup(data: {}) {
    console.log("calling apiClient");
    console.log("calling apiClient - insert user to group is", data);
    let a = this.apiClient.post("groups/addgroupuser", data);
    console.log("in usernetwork.ts returning api result", a);
    return a;
  }

  contactslist() {
    console.log("calling apiClient");
    let a = this.apiClient.get("contacts/getlist");
    console.log("in usernetwork.ts returning api result", a);
    return a;
  }

  insertnewinvite(data: {}) {
    console.log("calling apiClient");
    console.log("calling apiClient - inserting new invite", data);
    let a = this.apiClient.post("invites/addinvite", data);
    console.log("in usernetwork.ts returning api result", a);
    return a;
  }

  inviteslist(query: {}) {
    console.log("calling apiClient");
    let a = this.apiClient.get("invites/getlist", query);
    console.log("in usernetwork.ts returning api result", a);
    return a;
  }
  sharedwithmelist() {
    console.log("calling apiClient");
    let a = this.apiClient.get("sharedwithme/getlist");
    console.log("in usernetwork.ts returning api result", a);
    return a;
  }
  sharedbymelist(query: {}) {
    console.log("calling apiClient");
    let a = this.apiClient.get("sharedbyme/getlist");
    console.log("in usernetwork.ts returning api result", a);
    return a;
  }
}
