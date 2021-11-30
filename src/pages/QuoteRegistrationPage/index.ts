import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { QuoteRegistrationPage } from "./QuoteRegistrationPage";

export default connect(selector, actions)(QuoteRegistrationPage);
