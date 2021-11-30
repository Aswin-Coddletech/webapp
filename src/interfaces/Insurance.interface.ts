import { IInventory } from "./Inventory.interface";

export interface IInsuranceWarrantyItem extends IInventory {
  warrantyTypes: { warrantyType: string }[];
}

export interface IInsuranceWarranty {
  warrantyType?: string;
  description?: string;
  amount?: number;
}
export interface IPolicy {
  _key?: string;
  id?: string;
  policyId?: string; //this is uuid, so not human friendly
  policyNumber?: string; //this will be human friendly as uuid is cryptic
  policyType?: string;
  policyStartDate?: string; // same as created date (default) or first-premium payment date
  policyEndDate?: string; //
  insurerId?: string;
  insurerName?: string;
  agentId?: string;
  agentName?: string;
  term?: number; //term in number of months
  termType?: string; //Regular - Long Term, On Demnad - Short Term, etc.
  frequency?: string; // MONTHLY, QUARTERLY, HALF-YEARLY, YEARLY, etc.
  premiumAmount?: number;
  premiumCcy?: string;
  coverAmount?: number;
  coverCcy?: string;
  warranties?: IInsuranceWarranty[];
  warrantedItems?: IInsuranceWarrantyItem[];
  warrantedItemsTotalAmount?: number;
  policyTypeDetails?: {
    tenant?: {};
    landlord?: {};
    homeowner?: {};
    art?: {};
    jewellery?: {};
    equipment?: {};
    automotive?: {};
    antique?: {};
    preciousCollection?: {};
    travel?: {};
    commercialProperty?: {};
    business?: {};
    industry?: {};
    other?: {};
  };
  status?: string; //pending-first-premium, pending, active, inactive etc.
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  userId?: string;
  orgId?: string;
}

export interface IPremiumPayment {
  _key?: string;
  id: string;
  policyId: string; //this will be uuid
  policyNumber: string; //this will be human readable as uuid is cryptic
  policyType: string;
  insurerId: string;
  insurerName: string;
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
  userId?: string;
}
