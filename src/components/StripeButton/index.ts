import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { StripeButton } from "./StripeButton";

export default connect(selector, actions)(StripeButton);
