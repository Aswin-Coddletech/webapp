import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { InsurancePolicyCard } from "./InsurancePolicyCard";

export default connect(selector, actions)(InsurancePolicyCard);
