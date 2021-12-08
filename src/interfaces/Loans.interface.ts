import { IInventory } from "./Inventory.interface";

export interface ILoanCollateralItem extends IInventory {
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

export interface ILoan {
  _key?: string;
  id?: string;
  //all of the below are newly updated
  quoteId?: string;
  quoteNumber?: string;
  loanId?: string;
  loanNumber?: number;
  loanType?: string;
  loanCategory?: string;
  loanPurpose?: string;
  lenderId?: string;
  lenderName?: string; // YOU WERE HERE
  quoteCcy?: string;
  loanCcy?: string;
  requestedCash?: number;
  quoteAmount?: number;
  loanAmount?: number;
  principalAmount?: number;
  refrenceInterestRate?: number;
  interestRate?: number;
  interestRateUnrounded?: number;
  interestAmount?: number;
  repaymentTermType?: string; // 'SHORT-TERM'; short or long term loan
  repaymentType?: string; // (ONETIME); INSTALLMENTS
  repaymentFrequency?: string; // (END-OF-TERM); BI-WEEKLY; MONTHLY
  repaymentNumberOfInstallments?: number;
  repaymentDurationInWeeks?: number;
  repaymentDurationInDays?: number;
  repaymentInstallmentAmount?: number;
  repaymentTotalAmount?: number;
  collateralItemsCount?: number; // 1 item is supported currently
  collateralInclusionsCount?: number;
  collateralItemsTotalMarketPrice?: number;
  collateralInclusionsTotalMarketPrice?: number;
  collateralTotalMarketPrice?: number;
  collateralItems?: ILoanCollateralItem[];
  collateralPickupSchedule?: IPickupSchedule;
  isCollateralCollectionRequired?: boolean;
  isCollateralCollectionComplete?: boolean;
  collateralCollectionMethod?: string; // MAILBOX-DROP; REMOTE-DIGITAL-SETUP
  isCollateralAcquisitionRequired?: boolean;
  isCollateralAcquisitionComplete?: boolean;
  collateralAcquisitionMethod?: string; // INHOUSE-ARRIVAL; REMOTE-DIGITAL-CONTROL
  isCollateralInspectionRequired?: boolean;
  isCollateralInspectionComplete?: boolean;
  collateralInspectionMethod?: string; // INHOUSE-INSPECTION; REMOTE-DIGITAL-INSPECTION
  isQuoteReviewRequired?: boolean;
  isQuoteReviewComplete?: boolean;
  quoteReviewMethod?: string; // BACKOFFICE-REVIEW
  isContractSignatureRequired?: boolean;
  isContractSignatureComplete?: boolean;
  contractSignatureMethod?: string;
  isLoanCreationRequired?: boolean;
  isLoanCreationComplete?: boolean;
  loanCreationMethod?: string;

  isLoanDisbursalRequestRequired?: boolean;
  isLoanDisbursalRequestComplete?: boolean;
  loanDisbursalRequestMethod?: string; // Backend will assign; STP-PAY-ORDER-POOLING
  loanDisbursalRequestCompletedBy?: string;
  isLoanDisbursalRequired?: boolean;
  isLoanDisbursalComplete?: boolean;
  loanDisbursalMethod?: string;
  isCollateralReturnRequired?: boolean;
  isCollateralReturnComplete?: boolean;
  collateralReturnMethod?: string;
  status?: string; // REJECTED; PENDING-SIGNATURE; SIGNATURE-DECLINED; SIGNED-AND-ACCEPTED
  loanStatus?: string; // NOT-CREATED; OPEN; CLOSED
  repaymentStatus?: string; // PENDING-DISBURSAL; ONGOING; FULLY-PAID
  userId?: string;
  orgId?: string;
  countryId?: string;
  createdBy?: string;
  createdAt?: string;
  modifiedBy?: string;
  modifiedAt?: string;
}

export interface ILoanRepayment {
  _key?: string;
  id?: string;
  loanId?: string; //this will be uuid
  loanNumber?: string; //this will be human readable as uuid is cryptic
  loanType?: string;
  lenderId?: string;
  lenderName?: string;
  paymentAmout?: string;
  paymentCcy?: string;
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

export interface IDisbursal {
  _key?: string;
  id?: string;
  disbursalId?: string; //this will be uuid
  disbursalNumber?: string; //this will be human readable as uuid is cryptic
  disbursalAmount?: string;
  disbursalCcy?: string;
  disbursalPayorderRefNumberMax7Digits?: string;
  disbursalPayorderTrackingCodeMax30Chars?: string;
  disbursalProcessType?: string;
  disbursalReason?: string;
  disbursalReference?: any;
  disbursalType?: string;
  events?: any;
  countryId?: string;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  customerId?: string;
  orgId?: string;
  status?: string;
  bbvaDetails?: any;
  fromAccountType?: string;
  fromAccountTypeDescription?: string;
  fromBankAccountNumber?: string;
  fromBankAccountOwnerName?: string;
  fromBankId?: string;
  fromCompanyName?: string;
  fromRfcOrCurpNumber?: string;
  loanId?: string;
  stpmexDetails?: any;
  toAccountType?: string;
  toAccountTypeDescription?: string;
  toBankAccountNumber?: string;
  toBankAccountOwnerName?: string;
  toBankId?: string;
  toCurpNumber?: string;
  toCustomerId?: string;
  toRfcNumber?: string;
  txnType?: string;
  userId?: string;
}

export interface IInstallment {
  _key?: string;
  id?: string;
  countryId?: string;
  createdAt?: string;
  createdBy?: string;
  installmentAmount?: string;
  installmentCcy?: string;
  installmentDueDate?: string;
  installmentNumber?: number;
  invoiceId?: string;
  lastPaymentAmount: 80;
  lastPaymentAt?: string;
  lastPaymentId?: string;
  loanId?: string;
  loanNumber?: string;
  loanType?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  orderId?: string;
  orgId?: string;
  repaidAmount?: number;
  repaidAt?: string;
  repaidBy?: string;
  repaymentReference?: any;
  status?: string;
  userId?: string;
}
