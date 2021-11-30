//import { IInventory } from "./Inventory.interface";
//import { IPolicy } from "./Insurance.interface";

export interface IOrder {
  _key?: string;
  id?: string;
  orderId?: string;
  userId?: string;
  orgId?: string;
  txnType?: string;
  products?: { productType?: string; product?: {}; quantity?: number }[]; // productType: Insurance Policy, Cell Phone, etc.
  amount?: number;
  ccy?: string;
  orderNumber?: string;
  orderReference?: {}; // can be an order for new policy, or an order for buying from melloon store, etc.
  status?: string; //pending, paid
  fullfillmentStatus?: string; // pending, delivered, fulfilled etc. depends on productType
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface IPayment {
  amount?: number;
  ccy?: string;
  chargeAmountInCents?: number;
  chargeType?: string;
  countryId?: string;
  createdAt?: string;
  createdBy?: string;
  loanId?: string;
  loanNumber?: string;
  loanType?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  orderId?: string;
  orderNumber?: string;
  orderReference?: any;
  orgId?: string;
  paymentId?: string;
  paymentNumber?: string;
  paymentRequest?: any;
  paymentResponse?: any;
  paymentType?: string;
  status?: string;
  stripeParams?: any;
  txnType?: string;
  userId?: string;
  amount_refunded?: number;
  //brand?:string;
}

//IPremiumPayment is currently not used...
export interface IPremiumPayment {
  _key?: string;
  id?: string;
  userId?: string;
  orgId?: string;
  policyId?: string;
  policyType?: string;
  insurerId?: string;
  insurerName?: string;
  premiumAmout?: string;
  premiumCcy?: string;
  paymentMode?: string;
  overdueChargesAmount?: number;
  paymentAmount?: number;
  paymentDate?: number;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface IInstallmentPayment {
  _key?: string;
  id?: string;
  countryId?: string;
  createdAt?: string; // stripe, paypal, etc.
  createdBy?: {};
  installmentNumber?: {};
  installmentPaymentId?: string;
  loanId?: string;
  modifiedAt?: string;
  modifiedBy?: string; //pending, paid, failed ==> represents status of stripe response
  orgId?: string;
  paymentAmount?: string;
  paymentAt?: string;
  paymentCcy?: string;
  paymentId?: string;
  status?: string;
  userId?: string;
}
