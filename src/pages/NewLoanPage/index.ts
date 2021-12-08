import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { NewLoanPage } from "./NewLoanPage";

export default connect(selector, actions)(NewLoanPage);
