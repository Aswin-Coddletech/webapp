export const prefix = "customer";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const CUSTOMER_DATA_REQUEST = `${prefix}/CUSTOMER_DATA_REQUEST`;
export const CUSTOMER_DATA_SUCCESS = `${prefix}/CUSTOMER_DATA_SUCCESS`;
export const CUSTOMER_DATA_FAILURE = `${prefix}/CUSTOMER_DATA_FAILURE`;

export const getCustomerList = (search: string) => ({
  promise: (api: any) => api.customer.customerList(search),
  types: [CUSTOMER_DATA_REQUEST, CUSTOMER_DATA_SUCCESS, CUSTOMER_DATA_FAILURE]
});

export const CUSTOMER_REQUEST = `${prefix}/CUSTOMER_REQUEST`;
export const CUSTOMER_SUCCESS = `${prefix}/CUSTOMER_SUCCESS`;
export const CUSTOMER_FAILURE = `${prefix}/CUSTOMER_FAILURE`;

export const getCustomer = (search: string) => ({
  promise: (api: any) => api.customer.customer(search),
  types: [CUSTOMER_REQUEST, CUSTOMER_SUCCESS, CUSTOMER_FAILURE]
});
