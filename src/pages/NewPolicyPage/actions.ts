import {
  resetSubmitSuccess,
  submitPolicy,
  resetPolicy
} from "src/redux/insurance-policy/actions";

export default {
  onInit: resetSubmitSuccess,
  onSubmit: submitPolicy,
  onNewPolicyInit: resetPolicy
};
