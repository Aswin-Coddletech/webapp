import { combineReducers } from "redux";
import { History } from "history";

import loans, { ILoanState } from "./loans/reducer";

import insurancePolicy, {
  IInsurancePolicyState
} from "./insurance-policy/reducer";
import addInventory, { IAddInventoryState } from "./add-inventory/reducer";
import diList, { IInventoryListState } from "./di-list/reducer";

import profile, { IProfileState } from "./profile/reducer";
import cognito, { ICognitoAuth } from "./cognito/reducer";

import userAccount, { IUserAccountState } from "./user-account/reducer";
import instantQuote, { IInstantQuoteState } from "./instant-quote/reducer";

import homePage, { IHomePageState } from "./home-page/reducer";
import quotes, { IQuotesState } from "./quotes/reducer";
import signatureDocument, {
  ISignatureDocumentState
} from "./signature-document/reducer";
import userItems, { IUserItemsState } from "./user-items/reducer";
import utils, { IUtilState } from "./utils/reducer";
import customer, { ICustomerState } from "./customer/reducer";
import shop, { IShopState } from './shop/reducer'
import order, { IOrderState } from './order/reducer'
import product, { IProductState} from './product/reducer'

import seller,{ ISellerState } from "./seller/reducer";


export interface IRootState {
  loans: ILoanState;
  insurancePolicy: IInsurancePolicyState;
  addInventory: IAddInventoryState;
  diList: IInventoryListState;
  cognito: ICognitoAuth;
  profile: IProfileState;
  userAccount: IUserAccountState;
  instantQuote: IInstantQuoteState;
  homePage: IHomePageState;
  quotes: IQuotesState;
  signatureDocument: ISignatureDocumentState;
  userItems: IUserItemsState;
  utils: IUtilState;
  customer: ICustomerState;
  shop:IShopState;
  order: IOrderState;
  product: IProductState;
  seller: ISellerState;
}

const createRootReducer = (history: History) =>
  combineReducers<IRootState>(
    Object.assign(
      loans,
      insurancePolicy,
      addInventory,
      diList,
      cognito,
      profile,
      userAccount,
      instantQuote,
      homePage,
      quotes,
      signatureDocument,
      userItems,
      utils,
      customer,
      shop,
      order,
      product,
      seller
    )
  );

export default createRootReducer;
