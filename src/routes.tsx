import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "./constants/routes";

import CustomerPage from "./pages/CustomerPage";
import ShopPage from "./pages/ShopPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import SellerPage from "./pages/SellerPage";
import ShopDetailPage from "./pages/ShopDetailPage";

import CognitoCallback from "./components/CognitoCallback";
import PrivateRoute from "./components/PrivateRoute";

import MainLayout from "./pages/MainLayout";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import DiListPage from "./pages/DiListPage";
import DiAddPage from "./pages/AddInventoryPage";

import ManagePoliciesPage from "./pages/ManagePoliciesPage";
import NewPolicyPage from "./pages/NewPolicyPage";

import QuoteApprovalPage from "./pages/QuoteApprovalPage";

import ManageUserAccountPage from "./pages/ManageUserAccountPage";
import LandingPage from "./pages/LandingPage";

import InstantQuotePage from "./pages/InstantQuotePage";

import QuoteApprovalDetailPage from "./pages/QuoteApprovalDetailPage";

import ManageInspectionsPage from "./pages/ManageInspectionsPage";
import InspectionDetailPage from "./pages/InspectionDetailPage";

import SignatureDocumentPage from "./pages/SignatureDocumentPage";
import SignatureDocumentDetailPage from "./pages/SignatureDocumentDetailPage";

import QuotesSearchPage from "./pages/QuotesSearchPage";
import QuotesDetailPage from "./pages/QuoteDetailPage";
import QuoteRegistrationPage from "./pages/QuoteRegistrationPage";
import QuoteEnrollmentPage from "./pages/QuoteEnrollmentPage";
import RegistrationDetailPage from "./pages/RegistrationDetailPage";
import EnrollmentDetailPage from "./pages/EnrollmentDetailPage";
import NewQuotesPage from "./pages/NewQuotesPage";
import NewQuotesDetailPage from "./pages/NewQuotesDetailPage";

import NuovoEnrollmentsPage from "./pages/NuovoEnrollmentsPage";
import NuovoEnrollmentsDetailPage from "./pages/NuovoEnrollmentsDetailPage";
import DeviceLockingPage from "./pages/DeviceLockingPage";
import DeviceLockingDetailPage from "./pages/DeviceLockingDetailPage";

import ManageLoansPage from "./pages/ManageLoansPage";
import LoanDetailPage from "./pages/LoanDetailPage";
import DisbursalPage from "./pages/DisbursalPage";
import DisbursalDetailPage from "./pages/DisbursalDetailPage";
import PayOrdersPage from "./pages/PayOrdersPage";
import PayOrdersDetailPage from "./pages/PayOrdersDetailPage";
import InstallmentsPage from "./pages/InstallmentsPage";
import InstallmentsDetailPage from "./pages/InstallmentsDetailPage";
import OverduesPage from "./pages/OverduesPage";

import ManualSTPMEXDetailPage from "./pages/ManualSTPMEXDetailPage";
import ManualBBVADetailPage from "./pages/ManualBBVADetailPage";

import UserSearchPage from "./pages/UserSearchPage";
import KycStatusPage from "./pages/KycStatusPage";
import UserDetailPage from "./pages/UserDetailPage";
import SegmentIdentityPage from "./pages/SegmentIdentityPage";
import SegmentDetailPage from "./pages/SegmentDetailPage";
import LoanRepaymentPage from "./pages/LoanRepaymentPage";
import RepaymentDetailPage from "./pages/RepaymentDetailPage";

import DataSciencePage from "./pages/DataSciencePage";



const ROUTES_OPTIONS = [
  {
    path: ROUTES.LANDING_PAGE,
    component: LandingPage,
    exact: true,
    private: false,
  },

  { path:ROUTES.CUSTOMER, component: CustomerPage, exact: true, private: true},
  { path:ROUTES.SHOP, component: ShopPage, exact: true, private: true },
  { path:ROUTES.ORDER, component: OrderPage, exact: true, private: true },
  { path:ROUTES.PRODUCT, component: ProductPage, exact: true, private: true },
  { path:ROUTES.SELLER, component: SellerPage, exact: true, private: true },
  { path:ROUTES.SHOP_DETAIL, component: ShopDetailPage, exact: true, private: true },

  { path: ROUTES.HOME, component: HomePage, exact: true, private: true },

  { path: ROUTES.DI_LIST, component: DiListPage, exact: true, private: true },
  { path: ROUTES.DI_ADD, component: DiAddPage, exact: true, private: true },
  {
    path: ROUTES.INSURANCE_MANAGE_POLICIES,
    component: ManagePoliciesPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.INSURANCE_NEW_POLICY,
    component: NewPolicyPage,
    exact: true,
    private: true,
  },

  {
    path: ROUTES.QUOTES_APPROVALS,
    component: QuoteApprovalPage,
    exact: true,
    private: true,
  },

  { path: ROUTES.COGNITO_CALLBACK, component: CognitoCallback, exact: true },
  { path: ROUTES.PROFILE, component: ProfilePage, exact: true, private: true },

  {
    path: ROUTES.USER_ACCOUNT_MANAGE,
    component: ManageUserAccountPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.QUOTES_SEARCH,
    component: QuotesSearchPage,
    exact: true,
    private: false,
  },
  {
    path: ROUTES.QUOTES_DETAIL,
    component: QuotesDetailPage,
    exact: true,
    private: false,
  },

  {
    path: ROUTES.INSTANT_QUOTE,
    component: InstantQuotePage,
    exact: true,
    private: false,
  },
  {
    path: ROUTES.QUOTES_APPROVAL_DETAIL,
    component: QuoteApprovalDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.QUOTES_REGISTRATION,
    component: QuoteRegistrationPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.REGISTRATION_DETAIL,
    component: RegistrationDetailPage,
    private: true,
  },
  {
    path: ROUTES.QUOTES_ENROLLMENT,
    component: QuoteEnrollmentPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.ENROLLMENT_DETAIL,
    component: EnrollmentDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.QUOTES_INSPECTIONS,
    component: ManageInspectionsPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.INSPECTION_DETAIL,
    component: InspectionDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.QUOTES_SIGNATURE_DOCUMENT,
    component: SignatureDocumentPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.QUOTES_SIGNATURE_DOCUMENT_DETAIL,
    component: SignatureDocumentDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.NEW_QUOTES_PAGE,
    component: NewQuotesPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.NEW_QUOTES_DETAIL_PAGE,
    component: NewQuotesDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS,
    component: ManageLoansPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_DETAIL,
    component: LoanDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_DISBURSALS,
    component: DisbursalPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_DISBURSALS_DETAIL,
    component: DisbursalDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.MANUAL_STPMEX_DETAIL,
    component: ManualSTPMEXDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.MANUAL_BBVA_DETAIL,
    component: ManualBBVADetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_PAYORDERS,
    component: PayOrdersPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_PAYORDERS_DETAIL,
    component: PayOrdersDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_INSTALLMENTS,
    component: InstallmentsPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_INSTALLMENTS_DETAIL,
    component: InstallmentsDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_OVERDUES,
    component: OverduesPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_REPAYMENTS,
    component: LoanRepaymentPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.LOANS_REPAYMENT_DETAIL,
    component: RepaymentDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.NUOVO_ENROLLMENTS,
    component: NuovoEnrollmentsPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.NUOVO_ENROLLMENTS_DETAIL,
    component: NuovoEnrollmentsDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.DEVICE_LOCKING,
    component: DeviceLockingPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.DEVICE_LOCKING_DETAIL,
    component: DeviceLockingDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.USERS_KYC_STATUS,
    component: KycStatusPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.USERS_DETAIL,
    component: UserDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.USERS_SEARCH,
    component: UserSearchPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.USERS_SEGMENT_IDENTITY,
    component: SegmentIdentityPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.USERS_SEGMENT_IDENTITY_DETAIL,
    component: SegmentDetailPage,
    exact: true,
    private: true,
  },
  {
    path: ROUTES.DEVICE_INTELLIGENCE,
    component: DataSciencePage,
    exact: true,
    private: true,
  },
];

const Routes = () => (
  <MainLayout>
    <Switch>
      {ROUTES_OPTIONS.map(
        ({ path, component: Component, private: priv, exact, ...rest }) => {
          const render = (props) => (
            <Component {...Object.assign({}, props, rest)} />
          );

          const componentProps: any = Object.keys(rest).length
            ? {
                exact,
                render,
                path,
                key: path,
              }
            : { exact, component: Component, path, key: path };

          return priv ? (
            <PrivateRoute {...componentProps} />
          ) : (
            <Route {...componentProps} />
          );
        }
      )}
    </Switch>
  </MainLayout>
);

export default Routes;
