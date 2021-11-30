import Base from "./base";
import { IUserAccount } from "src/interfaces/UserAccount.interface";

export class Useraccount extends Base {
  get() {
    let path = "";
    let a = "";
    path = "/accounts/user";
    a = this.apiClient.get(path);
    console.log("response of userinfo", a);
    return a;
  }

  async policyFlag(user: IUserAccount) {
    let path = "";
    let a;
    let termsDateConvert;
    let policyDateConvert;
    const termsDate = user.termsAcceptedAt;
    const policyDate = user.privacyPolicyAcceptedAt;
    path = "/legal/publicpolicy/publicationdate";
    a = await this.apiClient.get(path);
    if (termsDate) {
      termsDateConvert = new Date(termsDate).getTime() / 1000;
    }
    if (policyDate) {
      policyDateConvert = new Date(policyDate).getTime() / 1000;
    }
    const publicaitonDateConvert =
      new Date(a["publicationDate"]).getTime() / 1000;
    if (
      publicaitonDateConvert > termsDateConvert ||
      publicaitonDateConvert > policyDateConvert
    ) {
      return true;
    } else {
      return false;
    }
  }

  policyAcceptedUpdate(data: {}) {
    let path = "";
    path = "/accounts/user/accept-publicpolicy";
    let a = this.apiClient.post(path, data);
    console.log("in policyAcceptedUpdate.ts returning api result", a);
    return a;
  }
  userAccountDetail(userId: string) {
    let path = "";
    path = "/backoffice/accounts/" + userId;
    let a = this.apiClient.get(path);
    console.log("account data in returning api result", a);
    return a;
  }
  ///**********/
  resetKyc(userId: any) {
    let path = "";
    path = "/backoffice/accounts/" + userId + "/kyc-reset-ine-db";
    let a = this.apiClient.get(path);
    console.log("account data in returning api result", a);
    return a;
  }
  verifyKyc(userId: any) {
    let path = "";
    path = "/backoffice/accounts/" + userId + "/kyc-reset-missing-rfc";
    let a = this.apiClient.get(path);
    console.log("account data in returning api result", a);
    return a;
  }
  userList(filter: any, search: any) {
    let path = "/backoffice/accounts/search?" + filter + "=" + search;
    console.log("calling apiClient");
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }
  adminAccountDetail(userId: any) {
    if (userId) {
      let path = "/backoffice/accounts/search?employeeId=" + userId;
      console.log("calling apiClient", userId);
      let a = this.apiClient.get(path);
      console.log("in loans.ts returning api result", a);
      return a;
    }
  }
}
