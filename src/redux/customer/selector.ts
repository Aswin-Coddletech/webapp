import { prefix } from './actions'
import { IRootState } from '../reducer'

export const loadingSelector = (state: IRootState) => state[prefix].loading

export const customerListSelector = (state: IRootState) => state[prefix].customerList

//export const customerSelector = (state: IRootState) => state[prefix].customer

//export const pageSelector = (state: IRootState) => state[prefix].page


