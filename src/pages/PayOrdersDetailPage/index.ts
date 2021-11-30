import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { PayOrdersDetailPage } from "./PayOrdersDetailPage";

export default connect(selector, actions)(PayOrdersDetailPage);
