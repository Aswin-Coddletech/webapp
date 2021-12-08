import { IPolicy } from "src/interfaces/Insurance.interface";

export const prefix = "insurancePolicy";

export const INIT = `${prefix}/INIT`;
export const onInit = () => ({
  type: INIT
});

export const POLICIES_LIST_REQUEST = `${prefix}/POLICIES_LIST_REQUEST`;
export const POLICIES_LIST_SUCCESS = `${prefix}/POLICIES_LIST_SUCCESS`;
export const POLICIES_LIST_FAILURE = `${prefix}/POLICIES_LIST_FAILURE`;

export const getPoliciesList = () => ({
  promise: (api: any) => api.insurance.policieslist(),
  types: [POLICIES_LIST_REQUEST, POLICIES_LIST_SUCCESS, POLICIES_LIST_FAILURE]
});

export const ITEMS_NOT_IN_POLICY_REQUEST = `${prefix}/ITEMS_NOT_IN_POLICY_REQUEST`;
export const ITEMS_NOT_IN_POLICY_SUCCESS = `${prefix}/ITEMS_NOT_IN_POLICY_SUCCESS`;
export const ITEMS_NOT_IN_POLICY_FAILURE = `${prefix}/ITEMS_NOT_IN_POLICY_FAILURE`;

export const CHANGE_POLICY = `${prefix}/CHANGE_POLICY`;
export const changePolicy = (policy: IPolicy) => ({
  type: CHANGE_POLICY,
  payload: policy
});

export const getItemsNotInPolicy = (policyId: string) => ({
  promise: (api: any) => api.insurance.itemsnotinpolicy(policyId),
  types: [
    ITEMS_NOT_IN_POLICY_REQUEST,
    ITEMS_NOT_IN_POLICY_SUCCESS,
    ITEMS_NOT_IN_POLICY_FAILURE
  ]
});

export const POLICY_REQUEST = `${prefix}/POLICY_REQUEST`;
export const POLICY_SUCCESS = `${prefix}/POLICY_SUCCESS`;
export const POLICY_FAILURE = `${prefix}/POLICY_FAILURE`;

export const getPolicy = (policyId: string) => ({
  promise: (api: any) => api.insurance.policy(policyId),
  types: [POLICY_REQUEST, POLICY_SUCCESS, POLICY_FAILURE]
});

export const INSERT_WARRANTEDITEMS_TO_POLICY_REQUEST = `${prefix}/INSERT_WARRANTEDITEMS_TO_POLICY_REQUEST`;
export const INSERT_WARRANTEDITEMS_TO_POLICY_SUCCESS = `${prefix}/INSERT_WARRANTEDITEMS_TO_POLICY_SUCCESS`;
export const INSERT_WARRANTEDITEMS_TO_POLICY_FAILURE = `${prefix}/INSERT_WARRANTEDITEMS_TO_POLICY_FAILURE`;

export const insertWarrantedItems = (data: {}) => ({
  promise: (api: any) => api.insurance.insertwarranteditemstopolicy(data),
  types: [
    INSERT_WARRANTEDITEMS_TO_POLICY_REQUEST,
    INSERT_WARRANTEDITEMS_TO_POLICY_SUCCESS,
    INSERT_WARRANTEDITEMS_TO_POLICY_FAILURE
  ]
});

export const CHANGE_PAGE = `${prefix}/CHANGE_PAGE`;
export const changePagination = (page: any) => ({
  type: CHANGE_PAGE,
  page
});

export const CHANGE_PAGE_SIZE = `${prefix}/CHANGE_PAGE_SIZE`;
export const changePageSize = (_: any, pageSize: any) => ({
  type: CHANGE_PAGE_SIZE,
  pageSize
});

export const SUBMIT_POLICY_REQUEST = `${prefix}/SUBMIT_POLICY_REQUEST`;
export const SUBMIT_POLICY_SUCCESS = `${prefix}/SUBMIT_POLICY_SUCCESS`;
export const SUBMIT_POLICY_FAILURE = `${prefix}/SUBMIT_POLICY_FAILURE`;

export const submitPolicy = pageData => ({
  promise: (api: any) => api.insurance.createpolicy(pageData),
  types: [SUBMIT_POLICY_REQUEST, SUBMIT_POLICY_SUCCESS, SUBMIT_POLICY_FAILURE]
});

export const RESET_SUBMIT_SUCCESS = `${prefix}/RESET_SUBMIT_SUCCESS`;
export const resetSubmitSuccess = () => ({
  type: RESET_SUBMIT_SUCCESS
});

export const RESET_POLICY = `${prefix}/RESET_POLICY`;
export const resetPolicy = () => ({
  type: RESET_POLICY
});
