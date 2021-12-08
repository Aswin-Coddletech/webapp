import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { UserDetailPage } from "./UserDetailPage";

export default connect(selector, actions)(UserDetailPage);
