import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { ModelList } from "./ModelList";

export default connect(selector, actions)(ModelList);
