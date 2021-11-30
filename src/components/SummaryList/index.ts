import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { SummaryList } from "./SummaryList";

export default connect(selector, actions)(SummaryList);
