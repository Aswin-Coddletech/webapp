import Base from "./base";

export class Seller extends Base {
  sellerList(search: any) {
    console.log("In Seller API");
    let path = "seller?q=" + search;
    console.log("Calling apiClient from Seller API###");
    let a = this.apiClient.get(path);
    console.log("***Path : ", a);
    return a;
  }

  seller(search: any) {
    let path = "seller?id=" + search;
    // console.log('Calling apiClient from Seller API###')
    let a = this.apiClient.get(path);
    // console.log('***Path : ',a)
    return a;
  }
}
