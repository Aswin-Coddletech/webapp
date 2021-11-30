import { createStructuredSelector } from "reselect";
import { IRootState } from "src/redux/reducer";

import {
  loadingSelector,
  policySelector,
  orderSelector,
  submitSuccessSelector
} from "src/redux/insurance-policy/selectors";

/*
import {
  orderSelector,
} from 'src/redux/payments/selectors';
*/

import { itemSelector } from "src/redux/di-list/selectors";

import {
  userIdSelector,
  orgIdSelector,
  userEmailSelector,
  idTokenSelector
} from "src/redux/profile/selectors";

import { INewPolicyPageData } from "./NewPolicyPage";

export default createStructuredSelector<IRootState, INewPolicyPageData>({
  loading: loadingSelector,
  policy: policySelector,
  order: orderSelector,
  item: itemSelector,
  userId: userIdSelector,
  orgId: orgIdSelector,
  apitoken: idTokenSelector,
  userEmail: userEmailSelector,
  submitSuccess: submitSuccessSelector
});

/* INewPolicyPageData: 
loading: boolean;
policy: IPolicy;
order: IOrder;
item: IInventory;
userId: string;
orgId: string;
apitoken: string;
userEmail: string;
submitSuccess: string;
*/
