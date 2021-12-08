import { connect } from "react-redux";

import actions from "./action";
import selector from "./selectors";

import { SellerDetailPage } from "./SellerDetailPage";

export default connect(selector, actions)(SellerDetailPage);
