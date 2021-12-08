export const INSURANCE_STATUS = {
  COVER: "COVER",
  NOCOVER: "NOCOVER",
  HOMECOVER: "HOMECOVER",
  NOHOMECOVER: "NOHOMECOVER",
  EQUIPMENTCOVER: "EQUIPMENTCOVER",
  NOEQUIPMENTCOVER: "NOEQUIPMENTCOVER"
};

export const INSURANCE_STATUS_LABELS = {
  [INSURANCE_STATUS.COVER]: "Insured",
  [INSURANCE_STATUS.NOCOVER]: "Not Insured",
  [INSURANCE_STATUS.HOMECOVER]: "Covered In Home Insurance",
  [INSURANCE_STATUS.NOHOMECOVER]: "Not Covered In Home Insurance",
  [INSURANCE_STATUS.EQUIPMENTCOVER]: "Equipment Insured",
  [INSURANCE_STATUS.NOEQUIPMENTCOVER]: "No Equipment Insurance"
};

export const ADD_INVENTORY_STEPS = {
  LOAD_IMAGE: "LOAD_IMAGE",
  ENTER_PRODUCTNAME: "ENTER_PRODUCTNAME",
  SELECT_CATEGORY: "SELECT_CATEGORY",
  ENTER_OEM: "ENTER_OEM",
  ENTER_PRICE_AND_DATE: "ENTER_PRICE_AND_DATE",
  DONE: "DONE",
  DEFINE_SPECS: "DEFINE_SPECS",
  UPLOAD_DOCUMENTS: "UPLOAD_DOCUMENTS",
  FINAL_REVIEW: "FINAL_REVIEW",
  ADDITION_DONE: "ADDITION_DONE"
};

export const ADD_INVENTORY_STEPS_ORDER = [
  ADD_INVENTORY_STEPS.LOAD_IMAGE,
  ADD_INVENTORY_STEPS.DEFINE_SPECS,
  ADD_INVENTORY_STEPS.UPLOAD_DOCUMENTS,
  ADD_INVENTORY_STEPS.FINAL_REVIEW,
  ADD_INVENTORY_STEPS.ADDITION_DONE
];

export const BRANDS = [
  { oem: "Apple" },
  { oem: "Samsung" },
  { oem: "Nokia" },
  { oem: "LG" },
  { oem: "Bosch" },
  { oem: "Grundig" },
  { oem: "Microsoft" },
  { oem: "Asus" }
];

export const CATEGORIES = [
  {
    category: "Electronics",
    subcategories: ["Cell Phone", "Laptop", "TV", "Camera"]
  },
  {
    category: "Home Appliances",
    subcategories: ["Washing Machine", "Refrigerator", "Room Heater"]
  },
  {
    category: "Music",
    subcategories: ["Guitar", "Refrigerator", "Room Heater"]
  },
  {
    category: "Fashion",
    subcategories: ["Clothes", "Glasses", "Shoes", "Bags"]
  },
  {
    category: "Vehicles",
    subcategories: ["Car", "Truck", "Scooter"]
  },
  {
    category: "Sports & Leisure",
    subcategories: ["Washing Machine", "Refrigerator", "Room Heater"]
  },
  {
    category: "Antique & Collections",
    subcategories: ["Special Collection", "Antique"]
  },
  {
    category: "Jems & Jewellery",
    subcategories: ["Ring", "Diamond", "Gold", "Necklace"]
  }
];

export const CATALOG_ITEMS = [
  {
    itemCode: "1",
    category: "Electronics",
    subcategory: "Cell Phone",
    oem: "Apple",
    oemProductModel: "IPhone 6",
    buyAmount: 100,
    buyCcy: "EUR"
  },
  {
    itemCode: "2",
    category: "Electronics",
    subcategory: "Laptop",
    oem: "Lenovo",
    oemProductModel: "Thinkpad 123",
    buyAmount: 2000,
    buyCcy: "EUR"
  }
];
