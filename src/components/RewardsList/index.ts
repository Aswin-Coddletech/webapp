import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { RewardsList } from "./RewardsList";

export default connect(selector, actions)(RewardsList);
