import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { InstantQuotePage } from "./InstantQuotePage";

export default connect(selector, actions)(InstantQuotePage);
