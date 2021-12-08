import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { UserSearchPage } from "./UserSearchPage";

export default connect(selector, actions)(UserSearchPage);
