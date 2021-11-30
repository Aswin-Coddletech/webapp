export const prefix = 'shop'

export const INIT = `${prefix}/INIT`
export const onInit = () => ({
    type: INIT
})

export const SHOP_DATA_REQUEST = `${prefix}/SHOP_DATA_REQUEST`
export const SHOP_DATA_SUCCESS = `${prefix}/SHOP_DATA_SUCCESS`
export const SHOP_DATA_FAILURE = `${prefix}/SHOP_DATA_FAILURE`
console.log('SHOP Action')


export const getShopList = (value) => ({
    promise: (api: any) => api.shop.shopList(value),
    types: [
        SHOP_DATA_REQUEST,
        SHOP_DATA_SUCCESS,
        SHOP_DATA_FAILURE
    ]
})

export const SHOP_REQUEST = `${prefix}/SHOP_REQUEST`
export const SHOP_SUCCESS = `${prefix}/SHOP_SUCCESS`
export const SHOP_FAILURE = `${prefix}/SHOP_FAILURE`

export const getShop = (shopId: any)=> ({
    promise: (api: any)=> api.shop.shop(shopId),
    types: [
        SHOP_REQUEST,
        SHOP_SUCCESS,
        SHOP_FAILURE
    ]
})

