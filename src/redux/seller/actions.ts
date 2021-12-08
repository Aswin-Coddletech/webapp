export const prefix = "seller";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const SELLER_DATA_REQUEST = `${prefix}/SELLER_DATA_REQUEST`;
export const SELLER_DATA_SUCCESS = `${prefix}/SELLER_DATA_SUCCESS`;
export const SELLER_DATA_FAILURE = `${prefix}/SELLER_DATA_FAILURE`;
console.log("Seller Action");

export const getSellerList = value => ({
  promise: (api: any) => api.seller.sellerList(value),
  types: [SELLER_DATA_REQUEST, SELLER_DATA_SUCCESS, SELLER_DATA_FAILURE]
});

export const SELLER_REQUEST = `${prefix}/SELLER_REQUEST`;
export const SELLER_SUCCESS = `${prefix}/SELLER_SUCCESS`;
export const SELLER_FAILURE = `${prefix}/SELLER_FAILURE`;
console.log("Seller Action");

export const getSeller = value => ({
  promise: (api: any) => api.seller.seller(value),
  types: [SELLER_REQUEST, SELLER_SUCCESS, SELLER_FAILURE]
});
