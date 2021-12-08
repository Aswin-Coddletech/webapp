import Base from "./base";

export class Customer extends Base {
  customerList(search: any) {
    console.log("In customer API");
    let path = "customer?q=" + search;
    console.log("Calling apiClient from Customer API###");
    let a = this.apiClient.get(path);
    //console.log('***Path : ',a)
    return a;
  }

  customer(search: any) {
    console.log("In customer API");
    let path = "customer?id=" + search;
    let a = this.apiClient.get(path);
    //console.log('***Path : ',a)
    return a;
  }
}
