import Base from "./base";

export class Order extends Base {
  orderList(search: any) {
    console.log("In Order API");
    let path = "order?q=" + search;
    console.log("Calling apiClient from Order API###");
    let a = this.apiClient.get(path);
    console.log("***Path : ", a);
    return a;
  }
  order(orderId: any) {
    let path = "order?id=" + orderId;
    console.log("Calling apiClient from Order API###");
    let a = this.apiClient.get(path);
    console.log("***Path : ", a);
    return a;
  }
}
