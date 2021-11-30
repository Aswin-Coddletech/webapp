import { prefix } from './actions'
import { IRootState } from '../reducer'

export const loadingSelector = (state: IRootState) => state[prefix].loading

export const orderListSelector = (state: IRootState) => state[prefix].orderList