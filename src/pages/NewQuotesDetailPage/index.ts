import { connect } from "react-redux";

import actions from "./actions";
import selector from "./selector";

import { NewQuotesDetailPage } from "./NewQuotesDetailPage";

export default connect(selector, actions)(NewQuotesDetailPage);
