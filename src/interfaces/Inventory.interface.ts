import { string, number } from "prop-types";

export interface ITag {
  label?: string;
}
export interface ISpec {
  label?: string;
  value?: string;
}
export interface IInventory {
  _key?: string;
  id?: string;
  itemId?: string;
  userId?: string;
  orgId?: string;
  ownerType?: string; // user, organization, etc.
  status?: string; // current, sold, gifted, donated, etc.

  itemName?: string;
  title?: string;
  itemDescription?: string; // for now same as oemProductModel

  category?: string;
  subcategory?: string;
  productType?: string;

  isEnrolled?: boolean;
  isLocked?: boolean;

  oem?: string;
  oemProductCategory?: string;
  oemProductCode?: string;
  oemProductModel?: string;
  oemSerialNumber?: string;

  buyAmount?: number;
  buyCcy?: string;
  buyDate?: string;

  barcode?: {};
  qrcode?: {};

  descriptionLabels?: ITag[];
  specifications?: ISpec[];

  primaryImageSource?: string;
  primaryImageFileType?: string;
  thumbnail?: string;

  additionalImages?: [{ imgeSource?: string; imageType?: string }];

  invoiceDetails?: {}; //==> {"invoiceId": "1",  "invoiceDate": "2019-01-06T08:15:15.919Z", "merchant": "Unicenter, Zeil, Frankfurt 60112"}
  invoiceDocument?: {
    documentName?: string;
    documentSource?: string;
    documentType: string;
  };
  additionalDocuments?: [
    { documentName?: string; documentSource?: string; documentType: string }
  ];

  base64imageUrl?: string; //not stored in inventory table; returned by API; used for display purpose;
  presignedImageUrl?: string; //not stored in inventory table; returned by API; used for display purpose;
  homeCover?: boolean; //not stored in inventory table; returned by API; used for display purpose;
  equipmentCover?: boolean; //not stored in inventory table; returned by API; used for display purpose;
  policies?: [
    {
      policyType?: string;
      policyId?: string;
      premiumAmout?: number;
      franchiseAmout?: number;
    }
  ]; //not stored in inventory table; returned by API; used for display purpose;

  createdAt?: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}
export interface IInventorySummary {
  totalAmount?: number;
  totalCount?: number;
  countOfInventoryItems?: {};
  totalPurchasePrice?: {};
  itemCountByInsuranceStatus?: {
    COVER?: number;
    NOCOVER?: number;
    HOMECOVER?: number;
    NOHOMECOVER?: number;
    EQUIPMENTCOVER?: number;
    NOEQUIPMENTCOVER?: number;
  };
  itemAmountByInsuranceStatus?: {
    COVER?: number;
    NOCOVER?: number;
    HOMECOVER?: number;
    NOHOMECOVER?: number;
    EQUIPMENTCOVER?: number;
    NOEQUIPMENTCOVER?: number;
  };
}
