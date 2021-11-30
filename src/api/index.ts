import config from "src/config";

import Auth from "./auth";
import ApiClient from "./client";

import { Dashboard } from "./dashboard";
import { Insurance } from "./insurance";
import { Inventory } from "./inventory";
import { Loans } from "./loans";
import { Market } from "./market";
import { Usernetwork } from "./usernetwork";
import { Useraccount } from "./useraccount";
import { InstantQuote } from "./instantquote";
import { Quotes } from "./quotes";
import { UserItems } from "./useritems";
import { Customer } from "./customer";
import { Shop } from "./shop";
import { Order } from "./order";
import { Product } from "./product";
import { Seller } from "./seller";

const apiClient = new ApiClient(config.apiPrefix);

export default {
  auth: new Auth(apiClient),
  client: apiClient,

  inventory: new Inventory(apiClient),
  dashboard: new Dashboard(apiClient),
  usernetwork: new Usernetwork(apiClient),
  market: new Market(apiClient),
  insurance: new Insurance(apiClient),
  loans: new Loans(apiClient),
  useraccounts: new Useraccount(apiClient),
  instantquote: new InstantQuote(apiClient),
  quotes: new Quotes(apiClient),
  useritems: new UserItems(apiClient),
  customer: new Customer(apiClient),
  shop: new Shop(apiClient),
  order: new Order(apiClient),
  product: new Product(apiClient),
  seller: new Seller(apiClient)
};
