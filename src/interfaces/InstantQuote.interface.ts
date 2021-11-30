import { IInventory } from "./Inventory.interface";

export interface IQuoteCollateralItem extends IInventory {
  itemId: string;
  itemCategory: string;
  itemBrand?: string;
  itemModel?: string;
  itemCondition?: string;
}

export interface IModel {
  _key?: string;
  id: string;
  productId: string;
  model: string;
  title: string;
  line: string;
  price: number;
  currency: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

export interface IBrand {
  //_key?: string;
  id: string;
  // brandId: string;
  brand: string;
  category: string;
  // logoImageSource: string;
  // createdAt?: string;
  // createdBy?: string;
  // modifiedAt?: string;
  // modifiedBy?: string;
}

export interface IInclusion {
  id: string;
  category: string;
  inclusion: string;
}

export interface IPickupTimeSlot {
  id: string;
  key: string;
  timeslot: string;
}

export interface IPickupAddress {
  pickupStreet?: string;
  pickupNumber?: number;
  pickupArea?: string;
}

export interface IquoteCollateralItem extends IInventory {
  itemId?: string;
  itemValueAmount?: number;
  itemValuationDate?: string;
}

export interface IPickupSchedule {
  pickupDate?: string;
  pickupTimeSlot?: string; //MORNING (8AM-11PM), AFTERNOON(1PM-4PM), EVENING(5PM-8PM)
  pickupAddress?: string;
  deliveryAddress?: string;
  pickupStatus?: string; //Pending, Picked, DoorLocked
}

export interface IQuote {
  _key?: string;
  id?: string;
  quoteId?: string; //this is uuid, so not human friendly
  quoteNumber?: string; //this will be human friendly as uuid is cryptic
  quoteCategory?: string; //Consumer vs. Business quotes
  quoteType?: string; //Car quote, Vehicle quote, Personal quote, Equipment Pawning, etc.
  quotePurpose?: string; // Optional - User can provide details when quote Type is Personal
  quoteStartDate?: string; // same as created date (default) or first-payment payment date
  quoteEndDate?: string; //
  lenderId?: string; // MELLOON to start with
  lenderName?: string; // Melloon Financial Services
  term?: number; //term in number of months, 3 months to start with
  termType?: string; //SHORT-TERM, LONG-TERM etc.
  repaymentType?: string; //ONETIME, MONTHLY or EMI, ANNUAL, etc.
  repaymentFrequency?: string; // END-OF-TERM, MONTHLY, QUARTERLY, HALF-YEARLY, YEARLY, etc.
  quoteCcy?: string;
  interestRate?: number;
  interestRatePerMonth?: number;
  principalAmount?: number;
  interestPerMonthAmount?: number;
  interestTotalAmount?: number;
  interestAmount?: number | undefined;
  repaymentTotalAmount?: number;
  repaymentInstallmentAmount?: number;
  repaymentInstallmentsCount?: number; //Only 1 END-OF-TERM repayment is supported currently
  emiAmount?: number; // equated monthly installments with repaymentFrequency = MONTHLY
  collateralItemsTotalValueAmount?: number;
  collateralItemsCount?: number; // 1 item is supported currently
  collateralItems?: IquoteCollateralItem[];
  collateralPickupSchedule?: IPickupSchedule;
  status?: string; //pending (for new quotes), active, inactive etc.
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  userId?: string;
  orgId?: string;
}
