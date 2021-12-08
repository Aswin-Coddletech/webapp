import Base from "./base";

export class Quotes extends Base {
  /*list(filters: any = {}) {
    console.log("calling apiClient");
    return this.apiClient.get('inventory', filters);
  }*/

  quotesList(status: any) {
    let path = "/backoffice/quotes/search?status=" + status;
    console.log("calling apiClient");
    let a = this.apiClient.get(path);
    console.log("**getqouteList : in loans.ts returning api result", a);
    return a;
  }

  quote(quoteId: string) {
    console.log("calling apiClient");
    console.log("calling apiClient - input loanId is", quoteId);
    let path = "/backoffice/quotes/" + quoteId;
    let a = this.apiClient.get(path);
    console.log("**quote : in loans.ts returning api result", a);
    return a;
  }

  inspectionCompleted(quoteId: string, observation: string) {
    let data = { quoteId, observation };
    console.log("calling apiClient - input data is", data);
    let path = "/backoffice/quotes/" + quoteId + "/inspection-complete";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  approveQuote(quoteId: string, status: string) {
    let data = { quoteId, status };
    console.log("calling apiClient - input data is", data);
    let path = "/backoffice/quotes/" + quoteId + "/approve";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  rejectQuote(
    quoteId: string,
    status: string,
    rejectionReason: string,
    rejectionType: string
  ) {
    //let data = { quoteId, status };
    let data = { quoteId, status, rejectionReason, rejectionType };
    console.log("calling apiClient - input data is", data);
    let path = "/backoffice/quotes/" + quoteId + "/approve";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  addObservation(observation: string) {
    let data = { observation };
    console.log("calling apiClient - input data is", data);
    let path = "/observations";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  frEnrollment(quoteId: string) {
    let data = { quoteId };
    console.log("calling apiClient - input data is", data);
    let path = "/backoffice/quotes/" + quoteId + "/android-fr-enrollment";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  quotesFilterList(filter: any, search: any) {
    let path = "/backoffice/quotes/search?" + filter + "=" + search;
    console.log("calling apiClient  with path : ", path);
    let a = this.apiClient.get(path);
    console.log("**quotesFilterList : in loans.ts returning api result", a);
    return a;
  }
}
