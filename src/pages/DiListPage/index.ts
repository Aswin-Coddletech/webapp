import { connect } from "react-redux";

import actions from "./actions";

import { DiListPage } from "./DiListPage";

export default connect(null, actions)(DiListPage);
