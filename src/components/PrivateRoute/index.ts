import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import selector from "./selector";
import actions from "./actions";

import { compose } from "src/utils";

import { PrivateRoute } from "./PrivateRoute";

export default compose(withRouter, connect(selector, actions))(PrivateRoute);
