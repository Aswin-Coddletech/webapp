export interface IUserAccount {
  _key?: string;
  id?: string;
  itemId?: string;
  userId?: string;
  orgId?: string;
  ownerType?: string; // user, organization, etc.
  status?: string; // current, sold, gifted, donated, etc.

  fullName?: string;
  address?: any;
  dateOfBirth?: string;
  countryId?: string;
  termsAcceptedAt?: string;
  privacyPolicyAcceptedAt?: string;
  emailId?: string;
  kycStatus?: string;
  passportNumber?: string;
  passportExpirationDate?: string;
  kycMatiVerificationStartedAt?: string;
  kycMatiVerificationInputsCompletedAt?: string;
  kycMatiVerificationCompletedAt?: string;
  kycAttempts?: number;
  kycRejectionReason?: string;
  rfcNumber?: any;
  phoneNumber?: any;
  loansActiveCount?: any;
  loansFullyRepaidCount?: any;
  loansRequestedCount?: any;
  loansSignedAndAcceptedCount?: any;
  customerAccountNumber?: any;
  city?: any;
  zipCode?: any;
  monthlyIncome?: any;
  incomePeriodicity?: any;
  familySize?: any;
  occupation?: any;

  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}
