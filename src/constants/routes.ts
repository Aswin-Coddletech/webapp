const {
  REACT_APP_PUBLIC_URL,
  //PORT,
  REACT_APP_COGNITO_AUTH_DOMAIN,
  REACT_APP_COGNITO_CLIENT_ID
} = process.env;

const BASE_URL = REACT_APP_PUBLIC_URL;

const getCognitoLink = (type: string) =>
  // June 11 update: changing the token to code to get refresh tokem
  // tslint:disable-next-line max-line-length
  //`https://${REACT_APP_COGNITO_AUTH_DOMAIN}/${type}?response_type=token&client_id=${REACT_APP_COGNITO_CLIENT_ID}&redirect_uri=${BASE_URL}/callback`;

  // tslint:disable-next-line max-line-length

  `https://${REACT_APP_COGNITO_AUTH_DOMAIN}/${type}?response_type=code&client_id=${REACT_APP_COGNITO_CLIENT_ID}&redirect_uri=${BASE_URL}/callback`;

export const ROUTES = {
  LANDING_PAGE: "/",
  HOME: "/home",

  DI: "/di",
  DI_LIST: "/di/dilist",
  DI_ADD: "/di/diadd",

  CUSTOMER: '/customer',
  SHOP: '/shop',
  PRODUCT: '/product',
  ORDER: '/order',
  SELLER: '/seller',
  SHOP_DETAIL: '/shop/detail',

  INSURANCE: "/insurance",
  INSURANCE_MANAGE_POLICIES: "/insurance/managepolicies",
  INSURANCE_NEW_POLICY: "/insurance/new",

  MANAGE_SHIPMENTS: "/manageshipments",

  COGNITO_CALLBACK: "/callback",
  SIGNUP: getCognitoLink("signup"),
  LOGIN: getCognitoLink("login"),

  CONFIRM_EMAIL: "/confirmEmail/:hash",
  PROFILE: "/profile",
  RESET_PASSWORD: "/reset-password/:hash",
  PASSWORD_RECOVERY: "/password-recovery",

  USER_ACCOUNT: "/user-account",
  USER_ACCOUNT_MANAGE: "/user-account/manage",

  INSTANT_QUOTE: "/instant-quote",

  QUOTES_SEARCH: "/quotes",
  QUOTES_DETAIL: "/quotes/detail",
  QUOTES_KYC_STATUS: "/quotes/kyc-status",
  QUOTES_REGISTRATION: "/quotes/registration",
  REGISTRATION_DETAIL: "/registartion/detail",
  QUOTES_ENROLLMENT: "/quotes/enrollment",
  ENROLLMENT_DETAIL: "/enrollment/detail",
  QUOTES_INSPECTIONS: "/quotes/inspections",
  INSPECTION_DETAIL: "/inspection/detail",
  QUOTES_APPROVALS: "/quotes/approval",
  QUOTES_APPROVAL_DETAIL: "/approval/detail",
  QUOTES_SIGNATURE_DOCUMENT: "/quotes/signature-document",
  QUOTES_SIGNATURE_DOCUMENT_DETAIL: "/quotes/signature-document/detail",
  NEW_QUOTES_PAGE: "/quotes/newquotes",
  NEW_QUOTES_DETAIL_PAGE: "/newquotes/detail",

  LOANS: "/loans",
  LOANS_DISBURSALS: "/loans/disbursals",
  LOANS_DISBURSALS_DETAIL: "/disbursals/detail",
  LOANS_REPAYMENTS: "/loans/repayments",
  LOANS_INSTALLMENTS: "/loans/installments",
  LOANS_ORDERS: "/loans/orders",
  LOANS_INVOICES: "/loans/invoices",
  LOANS_TRANSACTIONS: "/loans/transactions",
  LOANS_RETURNS: "/loans/returns",
  LOANS_CLOSURE: "/loans/closure",
  LOANS_OVERDUES: "/loans/overdues",
  LOANS_DETAIL: "/loans/detail",
  LOANS_PAYORDERS: "/loans/payorders",
  LOANS_PAYORDERS_DETAIL: "/payorders/detail",
  LOANS_INSTALLMENTS_DETAIL: "/installments/detail",
  LOANS_REPAYMENT_DETAIL: "/repayment/detail",

  MANUAL_STPMEX_DETAIL: "/manual-stpmex/detail",
  MANUAL_BBVA_DETAIL: "/manual-bbva/detail",

  NUOVO_ENROLLMENTS: "/device-control/nuovo-enrollments",
  NUOVO_ENROLLMENTS_DETAIL: "/nuovo-enrollments/detail",
  DEVICE_LOCKING: "/device-control/device-locking",
  DEVICE_LOCKING_DETAIL: "/device-locking/detail",

  USERS_SEARCH: "/users",
  USERS_KYC_STATUS: "/users/kyc-tatus",
  USERS_DETAIL: "/users/detail",
  USERS_DISABLE: "/users/disable",
  USERS_CHANGE_COUNTRY: "/users/change-country",
  USERS_UPDATE_CEP: "/users/update-cep",
  USERS_SEGMENT_IDENTITY: "/users/segment-identity",
  USERS_SEGMENT_IDENTITY_DETAIL: "/segment-identity/detail",

  CATALOG_CATEGORIES: "/catelog/categories",
  CATALOG_BRANDS: "/catelog/brands",
  CATALOG_PRODUCTS: "/catelog/products",
  CATALOG_PRICES: "/catelog/prices",

  DISCOUNT_CAMPAIGNS: "/discount-campaigns",
  REWARD_CAMPAIGNS: "/reward-campaigns",

  QUOTE_PROCESS_FLOW: "/quote-process-flow",
  LOAN_PROCESS_FLOW: "/loan-process-flow",
  LOAN_PARAMETERS: "/loan-parameters",
  ACCOUNT_NUMBERS: "/account-numbers",

  BI_REPORTS_LOANS: "/bi-report/loans",
  BI_REPORTS_INSTALLMENTS: "/bi-report/installments",
  BI_REPORTS_PAYMENTS: "/bi-report/payments",
  BI_REPORTS_PAYMENTS_ERRORS: "/bi-report/payements-errors",
  BI_REPORTS_LOAN_COLLATERAL_DETAIL: "/bi-report/loan-collateraldetails",

  USER_INSIGHTS: "/datascience/user-insights",
  CREDIT_INSIGHTS: "/datascience/credit-insights",
  DEVICE_INTELLIGENCE: "/datascience/device-intellegence"
};

export const MAIN_MENU = [
  {
    label: "Manage Quotes",
    iconsrc: "HomeOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "Quotes Search",
        iconsrc: "BarChartOutlined",
        path: ROUTES.QUOTES_SEARCH,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "New Quotes",
        iconsrc: "BarChartOutlined",
        path: ROUTES.NEW_QUOTES_PAGE,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Collateral Pickup/Register/Remote-Setup",
        iconsrc: "BarChartOutlined",
        path: ROUTES.QUOTES_REGISTRATION,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Collateral Custody/Enrollment/Inhouse-Arrival",
        iconsrc: "FileSearchOutlined",
        path: ROUTES.QUOTES_ENROLLMENT,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Inspections(Inhouse/ Remote-Diagnostic)",
        iconsrc: "FileDoneOutlined",
        path: ROUTES.QUOTES_INSPECTIONS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Approvals",
        iconsrc: "DeliveredProcedureOutlined",
        path: ROUTES.QUOTES_APPROVALS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Signature/Documents",
        iconsrc: "MoneyCollectOutlined",
        path: ROUTES.QUOTES_SIGNATURE_DOCUMENT,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Customer Details",
    iconsrc: "HomeOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "View Customers",
        iconsrc: "BarChartOutlined",
        path: ROUTES.CUSTOMER,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Store Details",
    iconsrc: "HomeOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "View Store",
        iconsrc: "BarChartOutlined",
        path: ROUTES.SHOP,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Product Details",
    iconsrc: "HomeOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "View Product",
        iconsrc: "BarChartOutlined",
        path: ROUTES.PRODUCT,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Order Details",
    iconsrc: "HomeOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "View Order",
        iconsrc: "BarChartOutlined",
        path: ROUTES.ORDER,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Seller Details",
    iconsrc: "HomeOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "View Seller",
        iconsrc: "BarChartOutlined",
        path: ROUTES.SELLER,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Manage Loans",
    iconsrc: "DollarOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "Loans Search",
        iconsrc: "AuditOutlined",
        path: ROUTES.LOANS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Disbursal",
        iconsrc: "FileSearchOutlined",
        path: ROUTES.LOANS_DISBURSALS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Payorders",
        iconsrc: "MoneyCollectOutlined",
        path: ROUTES.LOANS_PAYORDERS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Installments",
        iconsrc: "MoneyCollectOutlined",
        path: ROUTES.LOANS_INSTALLMENTS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Overdues",
        iconsrc: "BarChartOutlined",
        path: ROUTES.LOANS_OVERDUES,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Repayments/Payback",
        iconsrc: "MoneyCollectOutlined",
        path: ROUTES.LOANS_REPAYMENTS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Orders",
        iconsrc: "BarChartOutlined",
        path: ROUTES.LOANS_ORDERS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Invoices",
        iconsrc: "BarChartOutlined",
        path: ROUTES.LOANS_INVOICES,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Transactions",
        iconsrc: "BarChartOutlined",
        path: ROUTES.LOANS_TRANSACTIONS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Returns",
        iconsrc: "BarChartOutlined",
        path: ROUTES.LOANS_RETURNS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Closure",
        iconsrc: "FileDoneOutlined",
        path: ROUTES.LOANS_CLOSURE,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Device-Control",
    iconsrc: "DollarOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "Device Search",
        iconsrc: "AuditOutlined",
        path: ROUTES.NUOVO_ENROLLMENTS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Device force-locking/force-unlocking",
        iconsrc: "AuditOutlined",
        path: ROUTES.DEVICE_LOCKING,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Manage Users",
    path: "",
    iconsrc: "MoneyCollectOutlined",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "User Search",
        iconsrc: "AuditOutlined",
        path: ROUTES.USERS_SEARCH,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "KYC/CDC",
        iconsrc: "AuditOutlined",
        path: ROUTES.USERS_KYC_STATUS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Disable/Delete",
        iconsrc: "MoneyCollectOutlined",
        path: ROUTES.USERS_DISABLE,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Change Country",
        iconsrc: "BarChartOutlined",
        path: ROUTES.USERS_CHANGE_COUNTRY,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Update CEP",
        iconsrc: "BarChartOutlined",
        path: ROUTES.USERS_UPDATE_CEP,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Segment Identity",
        iconsrc: "BarChartOutlined",
        path: ROUTES.USERS_SEGMENT_IDENTITY,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Manage Catalog",
    iconsrc: "BarChartOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "Categories",
        iconsrc: "AuditOutlined",
        path: ROUTES.CATALOG_CATEGORIES,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Brands",
        iconsrc: "BarChartOutlined",
        path: ROUTES.CATALOG_BRANDS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Products",
        iconsrc: "FileSearchOutlined",
        path: ROUTES.CATALOG_PRODUCTS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Prices",
        iconsrc: "MoneyCollectOutlined",
        path: ROUTES.CATALOG_PRICES,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Manage Rewards & Discounts",
    iconsrc: "BarChartOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "Discount Campaigns",
        iconsrc: "AuditOutlined",
        path: ROUTES.DISCOUNT_CAMPAIGNS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Reward Campaigns",
        iconsrc: "BarChartOutlined",
        path: ROUTES.REWARD_CAMPAIGNS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Data Science",
    iconsrc: "AuditOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "Device Intelligence",
        iconsrc: "AuditOutlined",
        path: ROUTES.DEVICE_INTELLIGENCE,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "User Insights",
        iconsrc: "AuditOutlined",
        path: ROUTES.USER_INSIGHTS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Credit Insights",
        iconsrc: "AuditOutlined",
        path: ROUTES.CREDIT_INSIGHTS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "BI Reports",
    iconsrc: "AuditOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "Loans",
        iconsrc: "AuditOutlined",
        path: ROUTES.BI_REPORTS_LOANS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Installments/Overdues",
        iconsrc: "BarChartOutlined",
        path: ROUTES.BI_REPORTS_INSTALLMENTS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Payments",
        iconsrc: "BarChartOutlined",
        path: ROUTES.BI_REPORTS_PAYMENTS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Payment Errors",
        iconsrc: "AuditOutlined",
        path: ROUTES.BI_REPORTS_PAYMENTS_ERRORS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Loan Collateral Details",
        iconsrc: "BarChartOutlined",
        path: ROUTES.BI_REPORTS_LOAN_COLLATERAL_DETAIL,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  },
  {
    label: "Settings",
    iconsrc: "BarChartOutlined",
    path: "",
    hideMenuForMobileMvp: false,
    children: [
      {
        label: "Quote Process Flow",
        iconsrc: "AuditOutlined",
        path: ROUTES.QUOTE_PROCESS_FLOW,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Loan Process Flow",
        iconsrc: "BarChartOutlined",
        path: ROUTES.LOAN_PROCESS_FLOW,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Loan Paramters",
        iconsrc: "FileSearchOutlined",
        path: ROUTES.LOAN_PARAMETERS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      },
      {
        label: "Account Numbers",
        iconsrc: "MoneyCollectOutlined",
        path: ROUTES.ACCOUNT_NUMBERS,
        hideMenuForMobileMvp: false,
        children: [],
        disabled: false
      }
    ],
    disabled: false
  }
];
