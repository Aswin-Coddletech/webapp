import { connect } from "react-redux";

import selector from "./selector";
import actions from "./actions";

import { UserInfo } from "./UserInfo";

export { UserInfo };

export default connect(selector, actions)(UserInfo);
