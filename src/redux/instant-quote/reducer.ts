import { combineReducers } from "redux";

import * as actions from "./actions";

import {
  IModel,
  IBrand,
  IInclusion,
  IPickupTimeSlot
} from "../../interfaces/InstantQuote.interface";

export interface IInstantQuoteState {
  brandList: IBrand[];
  modelList: IModel[];
  loading: boolean;
  submitSuccess: string;
  catList: any[];
  inclusionList: any[];
  pickupTimeSlot: any[];
  pickupStreet: string;
  pickupNumber: number;
  pickupArea: string;
}

const reducer = combineReducers<IInstantQuoteState>({
  loading(state = false, action) {
    switch (action.type) {
      case actions.GET_CATEGORY:
        return false;
      case actions.BRANDS_SUCCESS:
        return false;
      case actions.BRANDS_FAILURE:
        return false;
      case actions.BRANDS_REQUEST:
        return true;
      case actions.MODELS_SUCCESS:
        return false;
      case actions.MODELS_FAILURE:
        return false;
      case actions.MODELS_REQUEST:
        return true;
      case actions.INCLUSION_SUCCESS:
        return false;
      case actions.INCLUSION_FAILURE:
        return false;
      case actions.INCLUSION_REQUEST:
        return true;
      case actions.TIMESLOT_SUCCESS:
        return false;
      case actions.TIMESLOT_FAILURE:
        return false;
      case actions.TIMESLOT_REQUEST:
        return true;
      case actions.PICKUPADDRESS_SUCCESS:
        return false;
      case actions.PICKUPADDRESS_FAILURE:
        return false;
      case actions.PICKUPADDRESS_REQUEST:
        return true;
      default:
        return state;
    }
  },

  catList(state = [], action) {
    switch (action.type) {
      case actions.GET_CATEGORY:
        return action.payload;
      default:
        return state;
    }
  },

  brandList(state: IBrand[] = [], action): IBrand[] {
    switch (action.type) {
      case actions.BRANDS_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },

  modelList(state: IModel[] = [], action): IModel[] {
    switch (action.type) {
      case actions.MODELS_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },

  inclusionList(state: IInclusion[] = [], action): IInclusion[] {
    switch (action.type) {
      case actions.INCLUSION_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },

  pickupTimeSlot(state: IPickupTimeSlot[] = [], action): IPickupTimeSlot[] {
    switch (action.type) {
      case actions.TIMESLOT_SUCCESS:
        return action.data;
      default:
        return state;
    }
  },

  pickupStreet(state = "", action) {
    switch (action.type) {
      case actions.SET_PICKUP_STREET:
        return action.payload;
      default:
        return state;
    }
  },
  pickupNumber(state = 0, action) {
    switch (action.type) {
      case actions.SET_PICKUP_NUMBER:
        return action.payload;
      default:
        return state;
    }
  },
  pickupArea(state = "", action) {
    switch (action.type) {
      case actions.SET_PICKUP_AREA:
        return action.payload;
      default:
        return state;
    }
  },

  submitSuccess(state = "", action) {
    return state;
  }
});

export default { [actions.prefix]: reducer };
