import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { DataSciencePage } from "./DataSciencePage";

export default connect(selector, actions)(DataSciencePage);
