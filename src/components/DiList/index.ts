import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { DiList } from "./DiList";

export default connect(selector, actions)(DiList);
