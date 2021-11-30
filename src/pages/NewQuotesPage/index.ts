import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { NewQuotesPage } from "./NewQuotesPage";

export default connect(selector, actions)(NewQuotesPage);
