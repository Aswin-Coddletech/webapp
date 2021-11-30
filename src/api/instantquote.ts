import Base from "./base";
//import { IModel } from '../interfaces/InstantQuote.interface';

export class InstantQuote extends Base {
  brands(category: string) {
    let path = "/catalog/brands";
    console.log("category", category);
    let a = this.apiClient.get(path, { categoryId: category });
    return a;
  }

  getModels(category: string, brand: string) {
    let path = "";
    path = "/catalog/models";
    let a = this.apiClient.get(path, {
      categoryId: category,
      brandId: brand,
      isLoansAllowed: true
    });
    return a;
  }

  getInclusions(category: string) {
    let path = "";
    path = "/catalog/inclusions";
    let a = this.apiClient.get(path, {
      categoryId: category,
      isInclusionAllowed: true
    });
    return a;
  }

  getPickupTime() {
    let path = "";
    path = "pickUpTime";
    let a = this.apiClient.get(path);
    return a;
  }

  pickupAddress(data: {}) {
    console.log("Address Inserted", data);
    let path = "";
    path = "pickupaddress";
    let a = this.apiClient.post(path, data);
    console.log("a", a);
    return a;
  }
}
