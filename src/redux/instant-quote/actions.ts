import {} from "../../interfaces/InstantQuote.interface";
import { submitPickupAddressSelector } from "./selectors";

export const prefix = "instantQuote";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const BRANDS_REQUEST = `${prefix}/BRANDS_REQUEST`;
export const BRANDS_SUCCESS = `${prefix}/BRANDS_SUCCESS`;
export const BRANDS_FAILURE = `${prefix}/BRANDS_FAILURE`;

export const getBrands = (category: string) => ({
  promise: (api: any) => api.instantquote.brands(category),
  types: [BRANDS_REQUEST, BRANDS_SUCCESS, BRANDS_FAILURE]
});

export const getPrice = () => ({});

export const MODELS_REQUEST = `${prefix}/MODELS_REQUEST`;
export const MODELS_SUCCESS = `${prefix}/MODELS_SUCCESS`;
export const MODELS_FAILURE = `${prefix}/MODELS_FAILURE`;

export const getModels = (category: string, brand: string) => ({
  promise: (api: any) => api.instantquote.getModels(category, brand),
  types: [MODELS_REQUEST, MODELS_SUCCESS, MODELS_FAILURE]
});

export const INCLUSION_REQUEST = `${prefix}/INCLUSION_REQUEST`;
export const INCLUSION_SUCCESS = `${prefix}/INCLUSION_SUCCESS`;
export const INCLUSION_FAILURE = `${prefix}/INCLUSION_FAILURE`;

export const getInclusion = (category: string) => ({
  promise: (api: any) => api.instantquote.getInclusions(category),
  types: [INCLUSION_REQUEST, INCLUSION_SUCCESS, INCLUSION_FAILURE]
});

export const TIMESLOT_REQUEST = `${prefix}/TIMESLOT_REQUEST`;
export const TIMESLOT_SUCCESS = `${prefix}/TIMESLOT_SUCCESS`;
export const TIMESLOT_FAILURE = `${prefix}/TIMESLOT_FAILURE`;

export const getpickupTimeSlot = () => ({
  promise: (api: any) => api.instantquote.getPickupTime(),
  types: [TIMESLOT_REQUEST, TIMESLOT_SUCCESS, TIMESLOT_FAILURE]
});

export const PICKUPADDRESS_REQUEST = `${prefix}/PICKUPADDRESS_REQUEST`;
export const PICKUPADDRESS_SUCCESS = `${prefix}/PICKUPADDRESS_SUCCESS`;
export const PICKUPADDRESS_FAILURE = `${prefix}/PICKUPADDRESS_FAILURE`;

export const submitQuote = () => (dataProvider: any) => ({
  promise: (api: any) =>
    api.instantquote.pickupAddress(dataProvider(submitPickupAddressSelector)),
  types: [PICKUPADDRESS_REQUEST, PICKUPADDRESS_SUCCESS, PICKUPADDRESS_FAILURE]
});

export const GET_CATEGORY = `${prefix}/GET_CATEGORY`;

export const getCategory = () => ({
  type: GET_CATEGORY,
  payload: [
    {
      key: "smartphones",
      name: "Smartphones",
      icon: require("../../assets/icons/smartphone.svg")
    },
    {
      key: "tablets",
      name: "Tablets",
      icon: require("../../assets/icons/tablet.svg")
    },
    {
      key: "laptops",
      name: "Laptops",
      icon: require("../../assets/icons/laptop.svg")
    },
    {
      key: "gaming_consoles",
      name: "Gaming consoles",
      icon: require("../../assets/icons/game-console.svg")
    },
    {
      key: "smartwatches",
      name: "Smartwatches",
      icon: require("../../assets/icons/smartwatch.svg")
    },
    {
      key: "cameras",
      name: "Cameras",
      icon: require("../../assets/icons/camera.svg")
    },
    {
      key: "speakers_headphones",
      name: "Speakers & headphones",
      icon: require("../../assets/icons/headset.svg")
    }
  ]
  // payload: [
  //   'smartphones',
  //   'tablets',
  //   'laptops',
  //   'gaming_consoles',
  //   'smartwatches',
  //   'cameras',
  //   'speakers_headphones',
  // ],
});

export const SET_PICKUP_STREET = `${prefix}/SET_PICKUP_STREET`;
export const setPickupStreet = (pickupStreet: string) => ({
  type: SET_PICKUP_STREET,
  payload: pickupStreet
});

export const SET_PICKUP_NUMBER = `${prefix}/SET_PICKUP_NUMBER`;
export const setPickupNumber = (pickupNumber: string) => ({
  type: SET_PICKUP_NUMBER,
  payload: pickupNumber
});

export const SET_PICKUP_AREA = `${prefix}/SET_PICKUP_AREA`;
export const setPickupArea = (pickupArea: string) => ({
  type: SET_PICKUP_AREA,
  payload: pickupArea
});

export const RESET_POLICY = `${prefix}/RESET_POLICY`;
export const resetQuote = () => ({
  //type: RESET_POLICY,
});
