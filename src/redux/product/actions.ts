export const prefix = 'product'

export const INIT = `${prefix}/INIT`
export const onInit = () => ({
    type: INIT
})

export const PRODUCT_DATA_REQUEST = `${prefix}/PRODUCT_DATA_REQUEST`
export const PRODUCT_DATA_SUCCESS = `${prefix}/PRODUCT_DATA_SUCCESS`
export const PRODUCT_DATA_FAILURE = `${prefix}/PRODUCT_DATA_FAILURE`
console.log('Product Action')


export const getProductList = (value) => ({
    promise: (api: any) => api.product.productList(value),
    types: [
        PRODUCT_DATA_REQUEST,
        PRODUCT_DATA_SUCCESS,
        PRODUCT_DATA_FAILURE
    ]
})

