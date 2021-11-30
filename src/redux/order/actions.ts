export const prefix = 'order'

export const INIT = `${prefix}/INIT`
export const onInit = () => ({
    type: INIT
})

export const ORDER_DATA_REQUEST = `${prefix}/ORDER_DATA_REQUEST`
export const ORDER_DATA_SUCCESS = `${prefix}/ORDER_DATA_SUCCESS`
export const ORDER_DATA_FAILURE = `${prefix}/ORDER_DATA_FAILURE`
console.log('Order Action')


export const getOrderList = (value) => ({
    promise: (api: any) => api.order.orderList(value),
    types: [
        ORDER_DATA_REQUEST,
        ORDER_DATA_SUCCESS,
        ORDER_DATA_FAILURE
    ]
})

