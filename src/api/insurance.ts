import Base from "./base";

export class Insurance extends Base {
  /*list(filters: any = {}) {
    console.log("calling apiClient");
    return this.apiClient.get('inventory', filters);
  }*/
  policieslist() {
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "policies/getlist";
    } else {
      path = "policies";
    }

    console.log("calling apiClient");
    let a = this.apiClient.get(path);
    console.log("in insurance.ts returning api result", a);
    return a;
  }

  policy(policyId: string) {
    console.log("calling apiClient");
    console.log("calling apiClient - input policyId is", policyId);
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "policies/getone";
    } else {
      path = "policies";
    }
    let a = this.apiClient.get(path, { policyId: policyId });
    console.log("in insurance.ts returning api result", a);
    return a;
  }

  itemsnotinpolicy(policyId: string) {
    console.log("calling apiClient");
    console.log("calling apiClient - getiing items not in policy", policyId);
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "policies/itemsnotinpolicy";
    } else {
      path = "itemsnotinpolicy";
    }
    let a = this.apiClient.get(path, { policyId: policyId });
    console.log("in insurance.ts returning api result", a);
    return a;
  }

  createpolicy(data: {}) {
    console.log("calling apiClient");
    console.log("calling apiClient - input data is", data);
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "policies/create";
    } else {
      path = "policies";
    }
    let a = this.apiClient.post(path, data);
    console.log("in insurance.ts returning api result", a);
    return a;
  }
}
