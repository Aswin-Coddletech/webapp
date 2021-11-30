import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { QuoteEnrollmentPage } from "./QuoteEnrollmentPage";

export default connect(selector, actions)(QuoteEnrollmentPage);
