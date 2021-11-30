import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { QuotesSearchPage } from "./QuotesSearchPage";

export default connect(selector, actions)(QuotesSearchPage);
