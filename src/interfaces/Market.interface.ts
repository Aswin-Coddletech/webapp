export interface IChatMessageMarket {
  _key?: string;
  id: string;
  marketBuyInventoryId: string;
  fromUserId?: string;
  fromUserEmail?: string;
  fromUserMarketName?: string;
  fromUserAvatar?: string;
  toGroupId?: string;
  toGroupName?: string;
  toUserId?: string;
  toUserEmail?: string;
  toUserMarketName?: string;
  toUserAvatar?: string;
  productMarketTitle?: string;
  productCode?: string;
  oem?: string;
  oemProductModel?: string;
  imageSource?: string;
  buyAmount?: number;
  buyCcy?: string;
  message: string;
  createdAt?: string;
  createdBy?: string;
}

export interface IMarketBuyItem {
  _key?: string;
  id: string;
  marketItemId: string;
  marketItemConditionTitle: string; //"brand new superb item"
  condition: string; //used, new
  status: string; //available, sold, removed
  fromUserEmail?: string;
  fromUserMarketName?: string;
  fromUserAvatar?: string;
  itemId?: string;
  itemName?: string;
  oem?: string;
  oemProductModel?: string;
  oemProductCode?: string;
  serialNumber?: string;
  primaryImageSource?: string;
  imageSource?: string;
  amount?: number;
  ccy?: string;
  equipmentCover: boolean;
  policyDetails: {};
  starsCount?: number;
  likesCount?: number;
  messagesCount?: number;
  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  userId?: string;
}
