import { connect } from "react-redux";

import actions from "./actions";

import { CognitoCallback } from "./CognitoCallback";

export default connect(null, actions)(CognitoCallback);
