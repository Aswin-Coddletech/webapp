import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { QuoteDetailPage } from "./QuoteDetailPage";

export default connect(selector, actions)(QuoteDetailPage);
 