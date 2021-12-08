import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { UserInfoModal } from "./UserInfoModal";

export default connect(selector, actions)(UserInfoModal);
