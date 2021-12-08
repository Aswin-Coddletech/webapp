import Base from "./base";

export class Loans extends Base {
  /*list(filters: any = {}) {
    console.log("calling apiClient");
    return this.apiClient.get('inventory', filters);
  }*/

  loansList(filter: any, serach: any) {
    let path = "/backoffice/loans/search?" + filter + "=" + serach;
    console.log("loan status", serach);
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }
  paymentList(filter: any, serach: any) {
    let path = "/backoffice/repayments/search?" + filter + "=" + serach;
    console.log("loan status", serach);
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }
  loan(loanId: string) {
    console.log("calling apiClient");
    console.log("calling apiClient - input loanId is", loanId);
    let path = "/backoffice/loans/" + loanId;
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  submitPayOrder(loanId: string, disbursalProcessType: string) {
    let data = { loanId, disbursalProcessType };
    console.log("calling apiClient - input data is", data);
    let path = "/backoffice/disbursals";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  createloan(data: {}) {
    console.log("calling apiClient");
    console.log("calling apiClient - input data is", data);
    let path = "";
    if (process.env.NODE_ENV === "production") {
      path = "loans/create";
    } else {
      path = "loans";
    }
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  approveLoan(quoteId: string, status: string) {
    let data = { quoteId, status };
    console.log("calling apiClient - input data is", data);
    let path = "/backoffice/quotes/approve";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  inspectionCompleted(quoteId: string) {
    let data = { quoteId };
    console.log("calling apiClient - input data is", data);
    let path = "/backoffice/quotes/inspection-complete";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  disbursalList(type: any) {
    let path = "/backoffice/disbursals/search?disbursalProcessType=" + type;
    console.log("loan status", type);
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  disbursal(disbursalId: string) {
    console.log("calling apiClient");
    console.log("calling apiClient - input loanId is", disbursalId);
    let path = "/backoffice/disbursals/" + disbursalId;
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  payOrdersList(filter: any, search: any) {
    let path = "/backoffice/payorders/search?" + filter + "=" + search;
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  payOrder(payOrderId: string) {
    console.log("calling apiClient");
    console.log("calling apiClient - input loanId is", payOrderId);
    let path = "/backoffice/payorders/" + payOrderId;
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  saveManualSTPMEXTransaction(
    disbursalId: any,
    stpmexRegistraOrdenId: any,
    stpmexPayorderSubmittedAt: any,
    stpmexPayorderCompletedAt: any,
    status: any
  ) {
    let data = {
      stpmexRegistraOrdenId,
      stpmexPayorderSubmittedAt,
      stpmexPayorderCompletedAt,
      status
    };
    console.log("calling apiClient - input data is", data);
    let path = "/backoffice/disbursals/" + disbursalId + "/stpmex-details";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  saveManualBBVATransaction(
    disbursalId: any,
    bbvaTransactinId: any,
    bbvaTransactinSubmittedAt: any,
    bbvaTransactinCompletedAt: any,
    status: any
  ) {
    let data = {
      bbvaTransactinId,
      bbvaTransactinSubmittedAt,
      bbvaTransactinCompletedAt,
      status
    };
    console.log("calling apiClient - input data is", data);
    let path = "/backoffice/disbursals/" + disbursalId + "/bbva-details";
    let a = this.apiClient.post(path, data);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  installmentList(filter: string, status: any) {
    let path = "/backoffice/installments/search?" + filter + "=" + status;
    console.log("loan status", status);
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  installmentDetails(id: any) {
    let path = "/backoffice/installments/" + id;
    console.log("loan status", id);
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }
  //repayment
  repaymentDetail(id: any) {
    let path = "/backoffice/repayments/" + id;
    console.log("loan status", id);
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  installmentPaymentDetails(id: any) {
    let path = "/backoffice/installments/" + id + "/installment-payments";
    console.log("loan status", id);
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  userOverdues(userId: any) {
    let path =
      "/backoffice/installments/search?status=OVERDUE&userId=" + userId;
    console.log("loan status", userId);
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }

  loanOverdues(loanId: any) {
    let path = "/backoffice/installments/" + loanId + "/overdues";
    console.log("loan status", loanId);
    let a = this.apiClient.get(path);
    console.log("in loans.ts returning api result", a);
    return a;
  }
}
